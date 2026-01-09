'use strict';

window.aurora = (function() {

    // Utility functions from user's 'good' version
    function rand(max) {
      return Math.random() * max;
    }

    function round(num) {
      return num < 0.5 ? 0 : 1;
    }

    function fadeInOut(t, m) {
        let hm = 0.5 * m;
        return Math.abs( ( (t + hm) % m ) - hm ) / (hm);
    }

    // Constants from user's 'good' version
    const rayCount = 500;
    const rayPropCount = 8;
    const rayPropsLength = rayCount * rayPropCount;
    const baseLength = 200;
    const rangeLength = 200;
    const baseSpeed = 0.05;
    const rangeSpeed = 0.1;
    const baseWidth = 10;
    const rangeWidth = 20;
    const baseHue = 200;
    const rangeHue = 125;
    const baseTTL = 50;
    const rangeTTL = 100;
    const noiseStrength = 150;
    const xOff = 0.0015;
    const yOff = 0.0015;
    const zOff = 0.0015;
    const backgroundColor = 'hsla(220,60%,3%,1)';

    // State variables
    let container;
    let canvas;
    let ctx;
    let center;
    let tick;
    let simplex;
    let rayProps;
    let animationFrameId;

    function setup(customContainer) {
        createCanvas(customContainer);
        if (!canvas) return;
        resize();
        initRays();
        draw();
    }

    function createCanvas(customContainer) {
        container = customContainer;
        if (!container) {
            console.error('aurora.js: container not provided!');
            canvas = null;
            return;
        }
        canvas = {
            a: document.createElement('canvas'),
            b: document.createElement('canvas')
        };
        canvas.b.style = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;
        container.appendChild(canvas.b);
        ctx = {
            a: canvas.a.getContext('2d'),
            b: canvas.b.getContext('2d')
        };
        center = [];
    }

    function initRays() {
        if (typeof SimplexNoise === 'undefined') {
            console.error('aurora.js: SimplexNoise is not defined!');
            return;
        }
        tick = 0;
        simplex = new SimplexNoise();
        rayProps = new Float32Array(rayPropsLength);
        for (let i = 0; i < rayPropsLength; i += rayPropCount) {
            initRay(i);
        }
    }

    function initRay(i) {
        let length, x, y1, y2, n, life, ttl, width, speed, hue;
        length = baseLength + rand(rangeLength);
        x = rand(canvas.a.width);
        y1 = center[1] + noiseStrength;
        y2 = center[1] + noiseStrength - length;
        n = simplex.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength;
        y1 += n;
        y2 += n;
        life = 0;
        ttl = baseTTL + rand(rangeTTL);
        width = baseWidth + rand(rangeWidth);
        speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1);
        hue = baseHue + rand(rangeHue);
        rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
    }

    function drawRays() {
        for (let i = 0; i < rayPropsLength; i += rayPropCount) {
            updateRay(i);
        }
    }

    function updateRay(i) {
        let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
        let x, y1, y2, life, ttl, width, speed, hue;
        x = rayProps[i];
        y1 = rayProps[i2];
        y2 = rayProps[i3];
        life = rayProps[i4];
        ttl = rayProps[i5];
        width = rayProps[i6];
        speed = rayProps[i7];
        hue = rayProps[i8];
        drawRay(x, y1, y2, life, ttl, width, hue);
        x += speed;
        life++;
        rayProps[i] = x;
        rayProps[i4] = life;
        (checkBounds(x) || life > ttl) && initRay(i);
    }

    function drawRay(x, y1, y2, life, ttl, width, hue) {
        let gradient = ctx.a.createLinearGradient(x, y1, x, y2);
        gradient.addColorStop(0, `hsla(${hue},100%,30%,0)`);
        gradient.addColorStop(0.5, `hsla(${hue},100%,20%,${fadeInOut(life, ttl) * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue},100%,30%,0)`);
        ctx.a.save();
        ctx.a.beginPath();
        ctx.a.strokeStyle = gradient;
        ctx.a.lineWidth = width;
        ctx.a.moveTo(x, y1);
        ctx.a.lineTo(x, y2);
        ctx.a.stroke();
        ctx.a.closePath();
        ctx.a.restore();
    }

    function checkBounds(x) {
        return x < 0 || x > canvas.a.width;
    }

    function resize() {
        if (!canvas) return;
        const { innerWidth, innerHeight } = window;
        canvas.a.width = innerWidth;
        canvas.a.height = innerHeight;
        ctx.a.drawImage(canvas.b, 0, 0);
        canvas.b.width = innerWidth;
        canvas.b.height = innerHeight;
        ctx.b.drawImage(canvas.a, 0, 0);
        center[0] = 0.5 * canvas.a.width;
        center[1] = 0.5 * canvas.a.height;
    }

    function render() {
        ctx.b.save();
        ctx.b.filter = 'blur(20px)';
        ctx.a.globalCompositeOperation = 'lighter';
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();
    }

    function draw() {
        if (!canvas) return;
        tick++;
        ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
        ctx.b.fillStyle = backgroundColor;
        ctx.b.fillRect(0, 0, canvas.b.width, canvas.a.height);
        drawRays();
        render();
        animationFrameId = window.requestAnimationFrame(draw);
    }

    // Public interface
    return {
        init: (customContainer) => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
            setup(customContainer);
            window.addEventListener('resize', resize);
        },
        cleanup: () => {
            window.removeEventListener('resize', resize);
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
            if (container && canvas && canvas.b && canvas.b.parentNode) {
                container.removeChild(canvas.b);
            }
            container = null;
            canvas = null;
        }
    };
})();

