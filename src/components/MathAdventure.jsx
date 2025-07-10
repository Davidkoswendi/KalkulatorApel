import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaClock, FaTrophy, FaHome, FaCheck, FaTimes, FaExclamationTriangle, FaAppleAlt } from 'react-icons/fa';
import '../styles/mathAdventure.css';
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';
import gameoverSound from '../assets/sounds/gameover.mp3';
import winSound from '../assets/sounds/win.mp3';

const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play().catch(e => console.log("Audio play failed:", e));
};

const AnswerFeedback = ({ isCorrect }) => {
  const apples = isCorrect
    ? Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 3
      }))
    : [];

  return (
    <div className="answer-feedback">
      <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? (
          <>
            <FaCheck /> Benar!
          </>
        ) : (
          <>
            <FaTimes /> Salah
          </>
        )}
      </div>

      {isCorrect && apples.map((apple) => (
        <FaAppleAlt 
          key={apple.id}
          className="falling-apple"
          style={{
            left: `${apple.left}%`,
            animation: `appleFall ${apple.duration}s ${apple.delay}s forwards`
          }}
        />
      ))}
    </div>
  );
};

const MathAdventure = ({ setCurrentTrack, resetMusic }) => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    score: 0,
    timeLeft: 20,
    lives: 5,
    currentQuestion: null,
    userAnswer: '',
    isPlaying: false,
    questionCount: 0,
    level: 1,
    gameOver: false,
    gameWon: false,
    answerHistory: [],
    error: ''
  });

  const [showFeedback, setShowFeedback] = useState({
    visible: false,
    isCorrect: false
  });

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateQuestion = (level) => {
    let question, answer;
    let a, b, c, d;

    const createDivision = (max) => {
      let divisor = getRandomInt(1, 10);
      let dividend = divisor * getRandomInt(1, Math.floor(max/divisor));
      return { dividend, divisor };
    };

    if (level === 1) {
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 10);
      if (Math.random() > 0.5) {
        question = `${a} + ${b} = `;
        answer = a + b;
      } else {
        question = `${a + b} - ${b} = `;
        answer = a;
      }
    }
    else if (level === 2) {
      a = getRandomInt(10, 19);
      b = getRandomInt(1, 9);
      if (Math.random() > 0.5) {
        question = `${a} + ${b} = `;
        answer = a + b;
      } else {
        question = `${a} - ${b} = `;
        answer = a - b;
      }
    }
    else if (level === 3) {
      a = getRandomInt(20, 50);
      b = getRandomInt(10, 20);
      if (Math.random() > 0.5) {
        question = `${a} + ${b} = `;
        answer = a + b;
      } else {
        question = `${a} - ${b} = `;
        answer = a - b;
      }
    }
    else if (level === 4) {
      if (Math.random() > 0.5) {
        a = getRandomInt(1, 10);
        b = getRandomInt(1, 10);
        question = `${a} × ${b} = `;
        answer = a * b;
      } else {
        const { dividend, divisor } = createDivision(100);
        question = `${dividend} ÷ ${divisor} = `;
        answer = dividend / divisor;
      }
    }
    else if (level === 5) {
      if (Math.random() > 0.5) {
        a = getRandomInt(1, 19);
        b = getRandomInt(1, 19);
        question = `${a} × ${b} = `;
        answer = a * b;
      } else {
        const { dividend, divisor } = createDivision(361);
        question = `${dividend} ÷ ${divisor} = `;
        answer = dividend / divisor;
      }
    }
    else if (level === 6) {
      if (Math.random() > 0.5) {
        a = getRandomInt(1, 99);
        b = getRandomInt(1, 99);
        question = `${a} × ${b} = `;
        answer = a * b;
      } else {
        const { dividend, divisor } = createDivision(9801);
        question = `${dividend} ÷ ${divisor} = `;
        answer = dividend / divisor;
      }
    }
    else if (level === 7 || level === 8) {
      const ops = ['+', '-', '×', '÷'];
      
      do {
        // Generate expressions that will definitely result in integers
        const op1 = ops[getRandomInt(2, 3)]; // Only × or ÷
        const op2 = ops[getRandomInt(0, 3)]; // Any operation
        
        if (op1 === '×') {
          a = getRandomInt(1, 10);
          b = getRandomInt(1, 10);
          c = getRandomInt(1, 10);
          
          // For multiplication first, then any operation
          const firstResult = a * b;
          if (op2 === '+') {
            answer = firstResult + c;
          } else if (op2 === '-') {
            answer = firstResult - c;
          } else if (op2 === '×') {
            answer = firstResult * c;
          } else { // ÷
            if (c === 0) continue;
            if (firstResult % c !== 0) continue;
            answer = firstResult / c;
          }
          
          question = `${a} × ${b} ${op2} ${c} = `;
        } else { // ÷
          // Create division that results in integer
          const { dividend, divisor } = createDivision(100);
          a = dividend;
          b = divisor;
          c = getRandomInt(1, 10);
          
          const firstResult = a / b;
          if (op2 === '+') {
            answer = firstResult + c;
          } else if (op2 === '-') {
            answer = firstResult - c;
          } else if (op2 === '×') {
            answer = firstResult * c;
          } else { // ÷
            if (c === 0) continue;
            if (firstResult % c !== 0) continue;
            answer = firstResult / c;
          }
          
          question = `${a} ÷ ${b} ${op2} ${c} = `;
        }
        
        if (Number.isInteger(answer) && answer >= 0) break;
      } while (true);
    }
    else if (level === 9 || level === 10) {
      const ops = ['+', '-', '×', '÷'];
      
      do {
        a = getRandomInt(1, 15);
        b = getRandomInt(1, 15);
        c = getRandomInt(1, 15);
        d = getRandomInt(1, 15);
        
        const op1 = ops[getRandomInt(0, 3)];
        const op2 = ops[getRandomInt(0, 3)];
        const op3 = ops[getRandomInt(0, 3)];

        question = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d} = `;
        
        try {
          answer = evalKABATAKU([a, op1, b, op2, c, op3, d]);
          if (Number.isInteger(answer) && answer >= 0) break;
        } catch (e) {
          continue;
        }
      } while (true);
    }

    return { question, answer: answer.toString() };
  };

  const evalKABATAKU = (tokens) => {
    // First pass: Handle all × and ÷ from left to right
    let i = 1;
    while (i < tokens.length) {
      const op = tokens[i];
      if (op === '×' || op === '÷') {
        const left = tokens[i-1];
        const right = tokens[i+1];
        let result;
        
        if (op === '×') {
          result = left * right;
        } else {
          if (right === 0) throw new Error("Division by zero");
          result = Math.floor(left / right);
        }
        
        tokens.splice(i-1, 3, result);
        i = 1;
      } else {
        i += 2;
      }
    }
    
    // Second pass: Handle all + and - from left to right
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const right = tokens[i+1];
      
      if (op === '+') {
        result += right;
      } else {
        result -= right;
      }
    }
    
    return result;
  };

  const generateQuestions = () => {
    const questionsByLevel = {};
    for (let level = 1; level <= 10; level++) {
      questionsByLevel[level] = Array.from({ length: 10 }, () => generateQuestion(level));
    }
    return questionsByLevel;
  };

  const questionsByLevel = generateQuestions();

  const startGame = () => {
    setCurrentTrack();
    setGameState({
      score: 0,
      timeLeft: 20,
      lives: 5,
      currentQuestion: questionsByLevel[1][0],
      userAnswer: '',
      isPlaying: true,
      questionCount: 1,
      level: 1,
      gameOver: false,
      gameWon: false,
      answerHistory: [],
      error: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gameState.userAnswer.trim()) {
      setGameState(prev => ({ ...prev, error: 'Jawaban tidak boleh kosong!' }));
      return;
    }

    setGameState(prev => ({ ...prev, error: '' }));
    checkAnswer();
  };

  const checkAnswer = () => {
    const currentLevelQuestions = questionsByLevel[gameState.level];
    const isCorrect = gameState.userAnswer === gameState.currentQuestion.answer;

    playSound(isCorrect ? correctSound : wrongSound);

    setShowFeedback({ visible: true, isCorrect });

    setTimeout(() => {
      setShowFeedback({ visible: false, isCorrect: false });
    }, 1500);

    const newAnswerHistory = [
      ...gameState.answerHistory,
      {
        question: gameState.currentQuestion.question,
        userAnswer: gameState.userAnswer,
        correctAnswer: gameState.currentQuestion.answer,
        isCorrect
      }
    ];

    setGameState(prev => {
      const newQuestionCount = prev.questionCount + 1;
      const newLevel = Math.floor(newQuestionCount / 10) + 1;
      const questionIndex = newQuestionCount % 10;
      const won = newLevel > 10;

      return {
        ...prev,
        score: isCorrect ? prev.score + 10 : prev.score,
        lives: isCorrect ? prev.lives : Math.max(0, prev.lives - 1),
        questionCount: newQuestionCount,
        level: won ? 10 : newLevel,
        currentQuestion: won ? prev.currentQuestion : currentLevelQuestions[questionIndex],
        userAnswer: '',
        timeLeft: 20,
        gameOver: isCorrect ? false : prev.lives <= 1,
        gameWon: won,
        answerHistory: newAnswerHistory,
        error: ''
      };
    });
  };

  useEffect(() => {
    let timer;
    if (gameState.isPlaying && gameState.timeLeft > 0 && !gameState.gameOver && !gameState.gameWon) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && gameState.isPlaying && !gameState.gameOver && !gameState.gameWon) {
      playSound(wrongSound);
      const newAnswerHistory = [
        ...gameState.answerHistory,
        {
          question: gameState.currentQuestion.question,
          userAnswer: '',
          correctAnswer: gameState.currentQuestion.answer,
          isCorrect: false
        }
      ];

      setGameState(prev => ({
        ...prev,
        lives: Math.max(0, prev.lives - 1),
        questionCount: prev.questionCount + 1,
        currentQuestion: questionsByLevel[prev.level][prev.questionCount % 10],
        userAnswer: '',
        timeLeft: 20,
        gameOver: prev.lives <= 1,
        answerHistory: newAnswerHistory
      }));
    }
    return () => clearInterval(timer);
  }, [gameState.timeLeft, gameState.isPlaying, gameState.gameOver, gameState.gameWon]);

  useEffect(() => {
    if (gameState.gameOver) {
      playSound(gameoverSound);
      setGameState(prev => ({ ...prev, isPlaying: false }));
      resetMusic();
    }
    if (gameState.gameWon) {
      playSound(winSound);
      setGameState(prev => ({ ...prev, isPlaying: false }));
      resetMusic();
    }
  }, [gameState.gameOver, gameState.gameWon, resetMusic]);

  const handleBackToMenu = () => {
    resetMusic();
    navigate('/', { state: { from: 'math-adventure' } });
  };

  return (
    <div className="math-adventure-container">
      {showFeedback.visible && <AnswerFeedback isCorrect={showFeedback.isCorrect} />}

      {!gameState.isPlaying && !gameState.gameOver && !gameState.gameWon ? (
        <div className="game-start-screen">
          <div className="apple-logo">🍎</div>
          <h2>Petualangan Matematika Apel</h2>
          <div className="game-instructions">
            <p><strong>Progresi Kesulitan:</strong></p>
            <ol>
              <li>Level 1: Penjumlahan/Pengurangan (1-10)</li>
              <li>Level 2: Bilangan Belasan (10-19)</li>
              <li>Level 3: Bilangan Puluhan (20-50)</li>
              <li>Level 4-6: Perkalian/Pembagian</li>
              <li>Level 7-10: Operasi Campuran (KABATAKU)</li>
            </ol>
            <p><strong>Aturan Main:</strong></p>
            <ul>
              <li>5 nyawa, salah berkurang 1</li>
              <li>20 detik per soal</li>
              <li>10 poin per jawaban benar</li>
              <li>KABATAKU: Kali Bagi Tambah Kurang</li>
            </ul>
          </div>
          <div className="game-controls">
            <button onClick={startGame} className="start-game-button">
              Mulai Petualangan
            </button>
            <button 
              onClick={handleBackToMenu}
              className="back-button"
            >
              <FaHome /> Kembali ke Menu
            </button>
          </div>
        </div>
      ) : gameState.isPlaying ? (
        <div className="game-play-screen">
          <div className="game-header">
            <div className="game-stat">
              <FaHeart className="heart-icon" /> Nyawa: {gameState.lives}
            </div>
            <div className="game-stat">
              <FaTrophy className="trophy-icon" /> Skor: {gameState.score}
            </div>
            <div className="game-stat">
              Level: {gameState.level}/10
            </div>
            <div className="game-stat">
              <FaClock className="clock-icon" /> Waktu: {gameState.timeLeft}s
            </div>
          </div>

          <div className="game-content">
            <h3>Soal {gameState.questionCount}:</h3>
            <div className="question">
              <p>{gameState.currentQuestion.question}</p>
              {gameState.level >= 7 && (
                <div className="kabataku-reminder">
                  Ingat urutan operasi (× ÷ + -)!
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={gameState.userAnswer}
                onChange={(e) => setGameState({
                  ...gameState, 
                  userAnswer: e.target.value, 
                  error: ''
                })}
                placeholder="Ketik jawaban..."
                autoFocus
                className={gameState.error ? 'input-error' : ''}
              />
              {gameState.error && (
                <div className="error-message">
                  <FaExclamationTriangle /> {gameState.error}
                </div>
              )}
              <button type="submit">Jawab</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="game-end-screen">
          <div className="game-result-header">
            {gameState.gameWon ? (
              <>
                <div className="victory-apple">🍎</div>
                <h2>Selamat! Kamu Menang!</h2>
              </>
            ) : (
              <h2>Game Over!</h2>
            )}
            <p>Skor akhir: <strong>{gameState.score}</strong></p>
            <p>Level yang dicapai: <strong>{gameState.level}</strong></p>
          </div>

          <div className="answer-review">
            <h3>Review Jawaban:</h3>
            <div className="review-list">
              {gameState.answerHistory.map((item, index) => (
                <div key={index} className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-question">
                    <p className="question-number">Soal {index + 1}:</p>
                    <p className="question-text">{item.question}</p>
                  </div>
                  <div className="review-answer">
                    {item.isCorrect ? (
                      <FaCheck className="correct-icon" />
                    ) : (
                      <FaTimes className="incorrect-icon" />
                    )}
                    <span>Jawaban kamu: {item.userAnswer || '(kosong)'}</span>
                    {!item.isCorrect && (
                      <span className="correct-answer">Jawaban benar: {item.correctAnswer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="game-end-buttons">
            <button onClick={startGame}>Main Lagi</button>
            <button 
              onClick={handleBackToMenu}
              className="back-button"
            >
              <FaHome /> Kembali ke Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathAdventure;