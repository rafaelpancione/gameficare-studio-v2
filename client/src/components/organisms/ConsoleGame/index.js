import React, { useRef, useEffect } from 'react';
import { GameWrapper, GameCanvas } from './styles';

import brickImg from '../../../assets/images/game/brick.png';
import ballImg from '../../../assets/images/game/ball.png';
import paddleImg from '../../../assets/images/game/paddle.png';
import sputImg from '../../../assets/images/game/sput.svg';
import heartFill from '../../../assets/images/game/heart_fill.svg';
import heartOver from '../../../assets/images/game/heart_over.svg';

function ConsoleGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 300;
    const uiHeight = 60;
    const paddleWidth = 60;
    const paddleHeight = 10;
    const paddleOffsetY = 20;
    const ballSize = 10;
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const brick = new Image();
    brick.src = brickImg;
    const ball = new Image();
    ball.src = ballImg;
    const paddle = new Image();
    paddle.src = paddleImg;
    const sput = new Image();
    sput.src = sputImg;
    const heartF = new Image();
    heartF.src = heartFill;
    const heartO = new Image();
    heartO.src = heartOver;

    let paddleX = (GAME_WIDTH - paddleWidth) / 2;
    let ballX = GAME_WIDTH / 2;
    let ballY = GAME_HEIGHT / 2;
    let dx = 2;
    let dy = -2;
    let leftPressed = false;
    let rightPressed = false;
    let lives = 3;
    let state = 'start'; // 'start' | 'playing' | 'win' | 'gameover'

    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 64;
    const brickHeight = 20;
    const brickPadding = 8;
    const brickOffsetTop = uiHeight;
    const brickOffsetLeft = 20;
    let bricks = [];

    function initBricks() {
      bricks = [];
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
      }
    }
    initBricks();

    function drawStartScreen() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = '#071f56';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = "14px 'Press Start 2P'";
      ctx.textAlign = 'center';
      const text = window.matchMedia('(pointer: coarse)').matches
        ? 'TOQUE NA TELA PARA JOGAR'
        : 'TECLE ← OU → PARA JOGAR';
      ctx.fillText(text, GAME_WIDTH / 2, GAME_HEIGHT / 2);
    }

    function drawUI() {
      ctx.fillStyle = '#071f56';
      ctx.fillRect(0, 0, GAME_WIDTH, uiHeight);
      const sputBase = uiHeight - 20;
      const sputSize = sputBase * 0.85;
      const sputX = brickOffsetLeft;
      ctx.drawImage(sput, sputX, (uiHeight - sputSize) / 2, sputSize, sputSize);
      const heartSize = sputBase * 0.5;
      const gap = 5;
      const startX = sputX + sputSize + 10;
      for (let i = 0; i < 3; i++) {
        const img = i < lives ? heartF : heartO;
        const x = startX + i * (heartSize + gap);
        const y = (uiHeight - heartSize) / 2;
        ctx.drawImage(img, x, y, heartSize, heartSize);
      }
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            const bx = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const by = r * (brickHeight + brickPadding) + brickOffsetTop;
            b.x = bx;
            b.y = by;
            ctx.drawImage(brick, bx, by, brickWidth, brickHeight);
          }
        }
      }
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (
              ballX > b.x &&
              ballX < b.x + brickWidth &&
              ballY > b.y &&
              ballY < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
            }
          }
        }
      }
    }

    function drawMessage(text) {
      ctx.fillStyle = '#fff';
      ctx.font = "14px 'Press Start 2P'";
      ctx.textAlign = 'center';
      ctx.fillText(text, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10);
      ctx.font = "10px 'Press Start 2P'";
      const prompt = window.matchMedia('(pointer: coarse)').matches
        ? 'TOQUE NA TELA PARA JOGAR NOVAMENTE'
        : 'TECLE ← OU → PARA JOGAR NOVAMENTE';
      ctx.fillText(prompt, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
    }

    function draw() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      drawUI();
      if (state !== 'playing') {
        drawMessage(state === 'win' ? 'PARABÉNS!' : 'GAME OVER');
        return;
      }
      drawBricks();
      collisionDetection();
      if (rightPressed) paddleX += 5;
      if (leftPressed) paddleX -= 5;
      paddleX = Math.max(0, Math.min(paddleX, GAME_WIDTH - paddleWidth));
      const paddleY = GAME_HEIGHT - paddleHeight - paddleOffsetY;
      ctx.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
      ctx.drawImage(ball, ballX, ballY, ballSize, ballSize);

      if (ballX + dx < 0 || ballX + dx > GAME_WIDTH - ballSize) dx = -dx;
      if (ballY + dy < uiHeight) dy = -dy;

      const nextY = ballY + dy;
      if (
        nextY + ballSize >= paddleY &&
        nextY + ballSize <= paddleY + paddleHeight
      ) {
        if (ballX + ballSize > paddleX && ballX < paddleX + paddleWidth) {
          ballY = paddleY - ballSize;
          dy = -dy;
        }
      } else if (nextY + ballSize > GAME_HEIGHT) {
        lives--;
        if (lives <= 0) {
          state = 'gameover';
        } else {
          ballX = GAME_WIDTH / 2;
          ballY = GAME_HEIGHT / 2;
          dy = -Math.abs(dy);
        }
      }

      ballX += dx;
      ballY += dy;

      if (bricks.flat().every((b) => b.status === 0)) {
        state = 'win';
      }

      animationId = requestAnimationFrame(draw);
    }

    function restart() {
      lives = 3;
      state = 'playing';
      paddleX = (GAME_WIDTH - paddleWidth) / 2;
      ballX = GAME_WIDTH / 2;
      ballY = GAME_HEIGHT / 2;
      dx = 2;
      dy = -2;
      initBricks();
      draw();
    }

    function keyDownHandler(e) {
      if (state !== 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') restart();
        return;
      }
      if (e.key === 'ArrowLeft') leftPressed = true;
      if (e.key === 'ArrowRight') rightPressed = true;
    }
    function keyUpHandler(e) {
      if (state === 'playing') {
        if (e.key === 'ArrowLeft') leftPressed = false;
        if (e.key === 'ArrowRight') rightPressed = false;
      }
    }
    function touchHandler(e) {
      if (state !== 'playing') {
        restart();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      paddleX = Math.max(
        0,
        Math.min(x - paddleWidth / 2, GAME_WIDTH - paddleWidth)
      );
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('touchmove', touchHandler);
    canvas.addEventListener('touchstart', touchHandler);

    drawStartScreen();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('touchmove', touchHandler);
      canvas.removeEventListener('touchstart', touchHandler);
    };
  }, []);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} />
    </GameWrapper>
  );
}

export default ConsoleGame;
