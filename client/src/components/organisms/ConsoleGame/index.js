import React, { useRef, useEffect } from 'react';
import { GameWrapper, GameCanvas } from './styles';
import brickImg from '../../../assets/images/game/brick.png';
import ballImg from '../../../assets/images/game/ball.png';
import paddleImg from '../../../assets/images/game/paddle.png';

function ConsoleGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // dimensões do jogo
    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 300;
    const paddleWidth = 60;
    const paddleHeight = 10;
    const ballSize = 10;
    const paddleOffsetY = 20; // sobe a raquete 20px
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // sprites
    const brick = new Image();
    brick.src = brickImg;
    const ball = new Image();
    ball.src = ballImg;
    const paddle = new Image();
    paddle.src = paddleImg;

    // estado paddle/bola
    let paddleX = (GAME_WIDTH - paddleWidth) / 2;
    let ballX = GAME_WIDTH / 2;
    let ballY = GAME_HEIGHT / 2;
    let dx = 2,
      dy = -2;

    // controles
    let leftPressed = false;
    let rightPressed = false;
    function keyDownHandler(e) {
      if (e.key === 'ArrowLeft') leftPressed = true;
      if (e.key === 'ArrowRight') rightPressed = true;
    }
    function keyUpHandler(e) {
      if (e.key === 'ArrowLeft') leftPressed = false;
      if (e.key === 'ArrowRight') rightPressed = false;
    }
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function touchMoveHandler(e) {
      const rect = canvas.parentNode.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      paddleX = Math.max(
        0,
        Math.min(touchX - paddleWidth / 2, GAME_WIDTH - paddleWidth)
      );
    }
    canvas.parentNode.addEventListener('touchmove', touchMoveHandler);

    // configuração dos tijolos
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 64;
    const brickHeight = 20;
    const brickPadding = 8;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 20;
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            b.x = brickX;
            b.y = brickY;
            ctx.drawImage(brick, brickX, brickY, brickWidth, brickHeight);
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

    function draw() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // tijolos
      drawBricks();
      collisionDetection();

      // move paddle via teclado
      if (rightPressed) paddleX += 5;
      if (leftPressed) paddleX -= 5;
      paddleX = Math.max(0, Math.min(paddleX, GAME_WIDTH - paddleWidth));

      // desenha paddle (com offset Y)
      ctx.drawImage(
        paddle,
        paddleX,
        GAME_HEIGHT - paddleHeight - paddleOffsetY,
        paddleWidth,
        paddleHeight
      );

      // desenha bola
      ctx.drawImage(ball, ballX, ballY, ballSize, ballSize);

      // colisões
      if (ballX + dx < 0 || ballX + dx > GAME_WIDTH - ballSize) dx = -dx;
      if (ballY + dy < 0) dy = -dy;
      else if (
        ballY + dy + ballSize >
        GAME_HEIGHT - paddleHeight - paddleOffsetY
      ) {
        const paddleTop = GAME_HEIGHT - paddleHeight - paddleOffsetY;
        const nextBallBottom = ballY + dy + ballSize;

        if (
          nextBallBottom >= paddleTop && // atingiu topo da raquete
          ballY < paddleTop && // não passou o limite
          ballX + ballSize > paddleX && // dentro dos limites X
          ballX < paddleX + paddleWidth
        ) {
          ballY = paddleTop - ballSize; // reposiciona em cima
          dy = -dy;
        } else if (ballY + dy > GAME_HEIGHT) {
          // reset se realmente passar do background
          ballX = GAME_WIDTH / 2;
          ballY = GAME_HEIGHT / 2;
          dy = -Math.abs(dy);
        }
      }

      ballX += dx;
      ballY += dy;

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.parentNode.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} />
    </GameWrapper>
  );
}

export default ConsoleGame;
