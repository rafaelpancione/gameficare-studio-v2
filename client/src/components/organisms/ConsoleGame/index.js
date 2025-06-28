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

    // ===== constantes de layout =====
    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 300;
    const uiHeight = 60;

    const paddleWidth = 60;
    const paddleHeight = 10;
    const paddleOffsetY = 20;
    const paddleSpeed = 6;

    const ballSize = 10;
    const baseBallSpeed = 2; // velocidade escalar fixa da bola

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // ===== sprites =====
    const brick = new Image();
    brick.src = brickImg;
    const ballImgSprite = new Image();
    ballImgSprite.src = ballImg;
    const paddleSprite = new Image();
    paddleSprite.src = paddleImg;
    const sputSprite = new Image();
    sputSprite.src = sputImg;
    const heartF = new Image();
    heartF.src = heartFill;
    const heartO = new Image();
    heartO.src = heartOver;

    // ===== estado =====
    let paddleX = (GAME_WIDTH - paddleWidth) / 2;
    let leftPressed = false;
    let rightPressed = false;
    let lives = 3;
    let state = 'start'; // 'start' | 'playing' | 'win' | 'gameover'
    let score = 0;
    let startTime = 0;
    let endTime = 0;
    let timeBonus = 0;
    let lifeBonus = 0;

    // tijolos
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 64;
    const brickHeight = 20;
    const brickPadding = 8;
    const brickOffsetTop = uiHeight;
    const brickOffsetLeft = 20;
    const initialBricksCount = brickRowCount * brickColumnCount;
    let remainingBricks = initialBricksCount;
    let bricks = [];

    function initBricks() {
      bricks = [];
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1, special: false };
        }
      }
      const specialIndex = Math.floor(Math.random() * initialBricksCount);
      const sc = Math.floor(specialIndex / brickRowCount);
      const sr = specialIndex % brickRowCount;
      bricks[sc][sr].special = true;
      remainingBricks = initialBricksCount;
    }
    initBricks();

    // cria bola na raquete com direção aleatória
    function createBallAtPaddle() {
      const x = paddleX + paddleWidth / 2 - ballSize / 2;
      const y = GAME_HEIGHT - paddleHeight - paddleOffsetY - ballSize;
      let dx = Math.random() * baseBallSpeed * 2 - baseBallSpeed;
      if (Math.abs(dx) < 1) dx = dx < 0 ? -1 : 1;
      const dy = -Math.sqrt(baseBallSpeed * baseBallSpeed - dx * dx);
      return { x, y, dx, dy };
    }

    // bolas
    let balls = [createBallAtPaddle()];

    // Função para desenhar botão no estilo CTAButton
    function drawButton(text, x, y, width = 200, height = 50) {
      // Fundo do botão (amarelo)
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x, y, width, height);

      // Borda do botão
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Sombra do botão (5px 5px)
      ctx.fillStyle = '#000';
      ctx.fillRect(x + 5, y + 5, width, height);

      // Botão principal (sobre a sombra)
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);

      // Texto do botão
      ctx.fillStyle = '#000';
      ctx.font = "12px 'Press Start 2P'";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + width / 2, y + height / 2);
    }

    // Função para verificar se um clique/touch está dentro do botão
    function isButtonClicked(
      mouseX,
      mouseY,
      buttonX,
      buttonY,
      buttonWidth = 200,
      buttonHeight = 50
    ) {
      return (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      );
    }

    // Posição do botão (centralizado)
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = (GAME_WIDTH - buttonWidth) / 2;
    const buttonY = GAME_HEIGHT / 2 + 60;

    // desenho telas
    function drawStartScreen() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = '#071f56';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Desenha o botão JOGAR
      drawButton('JOGAR', buttonX, buttonY, buttonWidth, buttonHeight);
    }

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
      const gap = 5;
      const startX = sputX + sputSize + 10;
      for (let i = 0; i < 3; i++) {
        const img = i < lives ? heartF : heartO;
        const x = startX + i * (heartSize + gap);
        const y = (uiHeight - heartSize) / 2;
        ctx.drawImage(img, x, y, heartSize, heartSize);
      }

      ctx.fillStyle = '#fff';
      ctx.font = "14px 'Press Start 2P'";
      ctx.textAlign = 'right';
      ctx.fillText(score.toString(), GAME_WIDTH - 10, uiHeight / 2 + 5);
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

      // Desenha o botão JOGAR NOVAMENTE
      drawButton(
        'JOGAR NOVAMENTE',
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight
      );
    }

    // colisão tijolos
    function collisionDetection(ball) {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
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
              1 +
              Math.floor(
                (initialBricksCount - remainingBricks) / brickColumnCount
              );
            score += 100 * level;
            if (b.special) {
              balls.push({
                x: ball.x,
                y: ball.y,
                dx: ball.dx,
                dy: -ball.dy,
              });
            }
          }
        }
      }
    }

    // loop principal
    function draw() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      drawUI();

      if (state !== 'playing') {
        drawMessage(state === 'win' ? 'PARABÉNS!' : 'GAME OVER');
        return;
      }

      drawBricks();

      // move paddle
      if (rightPressed) paddleX += paddleSpeed;
      if (leftPressed) paddleX -= paddleSpeed;
      paddleX = Math.max(0, Math.min(paddleX, GAME_WIDTH - paddleWidth));
      const paddleY = GAME_HEIGHT - paddleHeight - paddleOffsetY;
      ctx.drawImage(paddleSprite, paddleX, paddleY, paddleWidth, paddleHeight);

      balls.forEach((ball, idx) => {
        collisionDetection(ball);

        // colisões com paredes
        if (ball.x + ball.dx < 0 || ball.x + ball.dx > GAME_WIDTH - ballSize) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy < uiHeight) {
          ball.dy = -ball.dy;
        }

        const nextY = ball.y + ball.dy;

        // colisão com paddle (apenas se estiver descendo)
        if (
          ball.dy > 0 &&
          nextY + ballSize >= paddleY &&
          nextY + ballSize <= paddleY + paddleHeight &&
          ball.x + ballSize > paddleX &&
          ball.x < paddleX + paddleWidth
        ) {
          ball.y = paddleY - ballSize;
          ball.dy = -ball.dy;
        }
        // caiu
        else if (nextY + ballSize > GAME_HEIGHT) {
          balls.splice(idx, 1);
          if (balls.length === 0) {
            lives--;
            if (lives <= 0) {
              state = 'gameover';
            } else {
              balls = [createBallAtPaddle()];
            }
          }
        }

        // movimenta
        ball.x += ball.dx;
        ball.y += ball.dy;
        ctx.drawImage(ballImgSprite, ball.x, ball.y, ballSize, ballSize);
      });

      // vitória
      if (remainingBricks === 0) {
        endTime = Date.now();
        const elapsedSec = (endTime - startTime) / 1000;
        timeBonus = Math.max(0, Math.floor(60 - elapsedSec) * 50);
        lifeBonus = lives * 500;
        score += timeBonus + lifeBonus;
        state = 'win';
      }

      animationId = requestAnimationFrame(draw);
    }

    // reinicia
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

    // inputs
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

    // Função para lidar com cliques no botão
    function handleButtonClick(mouseX, mouseY) {
      if (state !== 'playing') {
        if (
          isButtonClicked(
            mouseX,
            mouseY,
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
          )
        ) {
          restart();
        }
        return;
      }
    }

    // Event listener para cliques do mouse
    function mouseClickHandler(e) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      handleButtonClick(mouseX, mouseY);
    }

    // Função unificada para touch (simplificada)
    function unifiedTouchHandler(e) {
      if (state !== 'playing') {
        e.preventDefault();
        e.stopPropagation();

        const rect = canvas.getBoundingClientRect();

        // Verificação de segurança para evitar erro de undefined
        let touchX, touchY;

        if (e.touches && e.touches.length > 0) {
          touchX = e.touches[0].clientX - rect.left;
          touchY = e.touches[0].clientY - rect.top;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          touchX = e.changedTouches[0].clientX - rect.left;
          touchY = e.changedTouches[0].clientY - rect.top;
        } else {
          console.log('No touch data available:', e);
          return;
        }

        // Calcular escala se o canvas foi redimensionado
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Aplicar escala às coordenadas de toque
        const scaledTouchX = touchX * scaleX;
        const scaledTouchY = touchY * scaleY;

        console.log('Touch coordinates:', {
          originalTouchX: touchX,
          originalTouchY: touchY,
          scaledTouchX,
          scaledTouchY,
          scaleX,
          scaleY,
          buttonX,
          buttonY,
          state,
          type: e.type,
        });

        // Log adicional para debug do botão
        const buttonRight = buttonX + buttonWidth;
        const buttonBottom = buttonY + buttonHeight;
        const isClicked = isButtonClicked(
          scaledTouchX,
          scaledTouchY,
          buttonX,
          buttonY,
          buttonWidth,
          buttonHeight
        );

        console.log('Button bounds:', {
          buttonX,
          buttonY,
          buttonRight,
          buttonBottom,
          buttonWidth,
          buttonHeight,
          scaledTouchX,
          scaledTouchY,
          isClicked,
          touchInX: scaledTouchX >= buttonX && scaledTouchX <= buttonRight,
          touchInY: scaledTouchY >= buttonY && scaledTouchY <= buttonBottom,
        });

        if (isClicked) {
          console.log('Button clicked! Restarting game...');
          restart();
          return;
        }
      }

      // Se está jogando, controla o paddle
      if (state === 'playing' && e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const scaleX = canvas.width / rect.width;
        const scaledX = x * scaleX;
        paddleX = Math.max(
          0,
          Math.min(scaledX - paddleWidth / 2, GAME_WIDTH - paddleWidth)
        );
      }
    }

    // Função para controle do paddle (apenas quando está jogando)
    function paddleTouchHandler(e) {
      if (state === 'playing') {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        paddleX = Math.max(
          0,
          Math.min(x - paddleWidth / 2, GAME_WIDTH - paddleWidth)
        );
      }
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    canvas.addEventListener('touchmove', paddleTouchHandler);
    canvas.addEventListener('touchstart', unifiedTouchHandler);
    canvas.addEventListener('touchend', unifiedTouchHandler);
    canvas.addEventListener('click', mouseClickHandler);

    drawStartScreen();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('touchmove', paddleTouchHandler);
      canvas.removeEventListener('touchstart', unifiedTouchHandler);
      canvas.removeEventListener('touchend', unifiedTouchHandler);
      canvas.removeEventListener('click', mouseClickHandler);
    };
  }, []);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} />
    </GameWrapper>
  );
}

export default ConsoleGame;
