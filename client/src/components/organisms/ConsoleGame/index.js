import React, { useRef, useEffect } from 'react';
import { GameWrapper, GameCanvas } from './styles';

import brickImg from '../../../assets/images/game/brick.png';
import ballImg from '../../../assets/images/game/ball.png';
import paddleImg from '../../../assets/images/game/paddle.png';
import sputImg from '../../../assets/images/game/sput.svg?url';
import heartFill from '../../../assets/images/game/heart_fill.svg?url';
import heartOver from '../../../assets/images/game/heart_over.svg?url';
import logoGame from '../../../assets/images/logo-game.png';

function ConsoleGame({ fullWidth = false }) {
  const canvasRef = useRef(null);

  // helper para detectar mobile
  const isMobile = () =>
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // ===== layout =====
    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 300;
    const uiHeight = 60;

    const paddleWidth = 60;
    const paddleHeight = 10;
    const paddleOffsetY = 20;
    const paddleSpeed = 6;

    const ballSize = 10;
    const baseBallSpeed = 2;

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // ===== sprites =====
    const brick = new Image();
    brick.src = brickImg;
    const ballSprite = new Image();
    ballSprite.src = ballImg;
    const paddleSprite = new Image();
    paddleSprite.src = paddleImg;
    const sputSprite = new Image();
    sputSprite.src = sputImg;
    const heartFull = new Image();
    heartFull.src = heartFill;
    const heartOverSprite = new Image();
    heartOverSprite.src = heartOver;
    const logoSprite = new Image();
    logoSprite.src = logoGame;

    // ===== estado =====
    let paddleX = (GAME_WIDTH - paddleWidth) / 2;
    let leftPressed = false;
    let rightPressed = false;
    let lives = 3;
    let state = 'start'; // start | playing | win | gameover
    let score = 0;
    let startTime = 0;
    let endTime = 0;
    let timeBonus = 0;
    let lifeBonus = 0;

    // tijolos
    const brickRows = 3;
    const brickCols = 5;
    const brickWidth = 64;
    const brickHeight = 20;
    const brickPadding = 8;
    const brickOffsetTop = uiHeight;
    const brickOffsetLeft = 20;
    const totalBricks = brickRows * brickCols;
    let remainingBricks = totalBricks;
    let bricks = [];

    function initBricks() {
      bricks = [];
      for (let c = 0; c < brickCols; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRows; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1, special: false };
        }
      }
      const specialIndex = Math.floor(Math.random() * totalBricks);
      const sc = Math.floor(specialIndex / brickRows);
      const sr = specialIndex % brickRows;
      bricks[sc][sr].special = true;
      remainingBricks = totalBricks;
    }
    initBricks();

    function createBallAtPaddle() {
      const x = paddleX + paddleWidth / 2 - ballSize / 2;
      const y = GAME_HEIGHT - paddleHeight - paddleOffsetY - ballSize;
      let dx = Math.random() * baseBallSpeed * 2 - baseBallSpeed;
      if (Math.abs(dx) < 1) dx = dx < 0 ? -1 : 1;
      const dy = -Math.sqrt(baseBallSpeed * baseBallSpeed - dx * dx);
      return { x, y, dx, dy };
    }

    let balls = [createBallAtPaddle()];

    // botão CTA
    function drawButton(text, x, y, width = 200, height = 50) {
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(x + 5, y + 5, width, height);
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = '#000';
      ctx.font = "12px 'Press Start 2P'";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + width / 2, y + height / 2);
    }

    function isButtonClicked(mx, my, bx, by, bw = 200, bh = 50) {
      return mx >= bx && mx <= bx + bw && my >= by && my <= by + bh;
    }

    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = (GAME_WIDTH - buttonWidth) / 2;
    const buttonY = GAME_HEIGHT / 2 + 60;

    // ===== telas =====
    function drawStartScreen() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = '#071f56';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // logo sempre
      const logoW = 200;
      const logoH = (logoSprite.height / logoSprite.width || 0.5) * logoW;
      const logoX = (GAME_WIDTH - logoW) / 2;
      const logoY = 40;
      ctx.drawImage(logoSprite, logoX, logoY, logoW, logoH);

      // texto de instrução (somente desktop)
      if (!isMobile()) {
        ctx.fillStyle = '#fff';
        ctx.font = "10px 'Press Start 2P'";
        ctx.textAlign = 'center';
        ctx.fillText('Use ← → para jogar', GAME_WIDTH / 2, logoY + logoH + 20);
      }

      drawButton('JOGAR', buttonX, buttonY, buttonWidth, buttonHeight);
    }

    logoSprite.onload = () => {
      if (state === 'start') drawStartScreen();
    };

    // ===== UI topo =====
    function drawUI() {
      ctx.fillStyle = '#071f56';
      ctx.fillRect(0, 0, GAME_WIDTH, uiHeight);

      const sputBase = uiHeight - 20;
      const sputSize = sputBase * 0.85;
      const sputX = brickOffsetLeft;
      ctx.drawImage(
        sputSprite,
        sputX,
        (uiHeight - sputSize) / 2,
        sputSize,
        sputSize
      );

      const heartSize = sputBase * 0.5;
      for (let i = 0; i < 3; i++) {
        const img = i < lives ? heartFull : heartOverSprite;
        const x = sputX + sputSize + 10 + i * (heartSize + 5);
        const y = (uiHeight - heartSize) / 2;
        ctx.drawImage(img, x, y, heartSize, heartSize);
      }

      ctx.fillStyle = '#fff';
      ctx.font = "14px 'Press Start 2P'";
      ctx.textAlign = 'right';
      ctx.fillText(score.toString(), GAME_WIDTH - 10, uiHeight / 2 + 5);
    }

    function drawBricks() {
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            const bx = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const by = r * (brickHeight + brickPadding) + brickOffsetTop;
            b.x = bx;
            b.y = by;
            if (b.special) {
              ctx.fillStyle = '#FD64E0';
              ctx.fillRect(bx, by, brickWidth, brickHeight);
            } else {
              ctx.drawImage(brick, bx, by, brickWidth, brickHeight);
            }
          }
        }
      }
    }

    function drawMessage(text) {
      ctx.fillStyle = '#fff';
      ctx.font = "14px 'Press Start 2P'";
      ctx.textAlign = 'center';
      ctx.fillText(text, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);

      ctx.font = "10px 'Press Start 2P'";
      if (state === 'win') {
        ctx.fillText(
          `Base: ${score - timeBonus - lifeBonus}`,
          GAME_WIDTH / 2,
          GAME_HEIGHT / 2 - 5
        );
        ctx.fillText(
          `Tempo: +${timeBonus}`,
          GAME_WIDTH / 2,
          GAME_HEIGHT / 2 + 10
        );
        ctx.fillText(
          `Vidas: +${lifeBonus}`,
          GAME_WIDTH / 2,
          GAME_HEIGHT / 2 + 25
        );
        ctx.fillText(`Total: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 45);
      } else {
        ctx.fillText(`Score: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5);
      }

      drawButton(
        'JOGAR NOVAMENTE',
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight
      );
    }

    // ===== detecção de colisão =====
    function collisionDetection(ball) {
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          const b = bricks[c][r];
          if (
            b.status === 1 &&
            ball.x > b.x &&
            ball.x < b.x + brickWidth &&
            ball.y > b.y &&
            ball.y < b.y + brickHeight
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            remainingBricks--;
            const level =
              1 + Math.floor((totalBricks - remainingBricks) / brickCols);
            score += 100 * level;
            if (b.special) {
              balls.push({ x: ball.x, y: ball.y, dx: ball.dx, dy: -ball.dy });
            }
          }
        }
      }
    }

    // ===== loop =====
    function draw() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      drawUI();

      if (state !== 'playing') {
        drawMessage(state === 'win' ? 'PARABÉNS!' : 'GAME OVER');
        return;
      }

      drawBricks();

      if (rightPressed) paddleX += paddleSpeed;
      if (leftPressed) paddleX -= paddleSpeed;
      paddleX = Math.max(0, Math.min(paddleX, GAME_WIDTH - paddleWidth));

      const paddleY = GAME_HEIGHT - paddleHeight - paddleOffsetY;
      ctx.drawImage(paddleSprite, paddleX, paddleY, paddleWidth, paddleHeight);

      balls.forEach((ball, i) => {
        collisionDetection(ball);

        if (ball.x + ball.dx < 0 || ball.x + ball.dx > GAME_WIDTH - ballSize)
          ball.dx = -ball.dx;
        if (ball.y + ball.dy < uiHeight) ball.dy = -ball.dy;

        const nextY = ball.y + ball.dy;

        if (
          ball.dy > 0 &&
          nextY + ballSize >= paddleY &&
          nextY + ballSize <= paddleY + paddleHeight &&
          ball.x + ballSize > paddleX &&
          ball.x < paddleX + paddleWidth
        ) {
          ball.y = paddleY - ballSize;
          ball.dy = -ball.dy;
        } else if (nextY + ballSize > GAME_HEIGHT) {
          balls.splice(i, 1);
          if (balls.length === 0) {
            lives--;
            if (lives <= 0) {
              state = 'gameover';
            } else {
              balls = [createBallAtPaddle()];
            }
          }
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
        ctx.drawImage(ballSprite, ball.x, ball.y, ballSize, ballSize);
      });

      if (remainingBricks === 0) {
        endTime = Date.now();
        const elapsed = (endTime - startTime) / 1000;
        timeBonus = Math.max(0, Math.floor(60 - elapsed) * 50);
        lifeBonus = lives * 500;
        score += timeBonus + lifeBonus;
        state = 'win';
      }

      animationId = requestAnimationFrame(draw);
    }

    function restart() {
      lives = 3;
      state = 'playing';
      paddleX = (GAME_WIDTH - paddleWidth) / 2;
      score = 0;
      timeBonus = 0;
      lifeBonus = 0;
      startTime = Date.now();
      initBricks();
      balls = [createBallAtPaddle()];
      draw();
    }

    function keyDownHandler(e) {
      if (state !== 'playing') {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) restart();
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

    function handleButtonClick(mx, my) {
      if (isButtonClicked(mx, my, buttonX, buttonY, buttonWidth, buttonHeight))
        restart();
    }

    function mouseHandler(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (state !== 'playing') handleButtonClick(mx, my);
    }

    function touchHandler(e) {
      if (state !== 'playing') {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0] || e.changedTouches[0];
        const mx = ((touch.clientX - rect.left) * canvas.width) / rect.width;
        const my = ((touch.clientY - rect.top) * canvas.height) / rect.height;
        handleButtonClick(mx, my);
        return;
      }

      if (state === 'playing' && e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x =
          ((e.touches[0].clientX - rect.left) * canvas.width) / rect.width;
        paddleX = Math.max(
          0,
          Math.min(x - paddleWidth / 2, GAME_WIDTH - paddleWidth)
        );
      }
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('click', mouseHandler);
    canvas.addEventListener('touchstart', touchHandler);
    canvas.addEventListener('touchmove', touchHandler);

    drawStartScreen();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('click', mouseHandler);
      canvas.removeEventListener('touchstart', touchHandler);
      canvas.removeEventListener('touchmove', touchHandler);
    };
  }, []);

  return (
    <GameWrapper fullWidth={fullWidth}>
      <GameCanvas ref={canvasRef} />
    </GameWrapper>
  );
}

export default ConsoleGame;
