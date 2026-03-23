import React, { useState, useEffect } from 'react';
import MISSIONS from '../../data/missions';

function QuickQuizModal({ onClose }) {
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Collect all questions from all missions
        const allQuestions = [];
        MISSIONS.forEach(mission => {
            if (mission.questions && Array.isArray(mission.questions)) {
                allQuestions.push(...mission.questions);
            }
        });
        
        if (allQuestions.length > 0) {
            const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)];
            setQuestionData(randomQ);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setShowResult(true);
        }
    };

    if (!questionData) return null;

    return (
        <div className={`mission-modal-overlay ${isClosing ? 'closing' : ''}`}>
            <div className="mission-modal-content mission-quiz-modal">
                <div className="mission-modal-header">
                    <h2>Quick Quiz</h2>
                    <button className="mission-modal-close" onClick={handleClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="mission-modal-body">
                    {!showResult ? (
                        <>
                            <div className="quiz-question" style={{marginBottom: '20px'}}>
                                <p>{questionData.question}</p>
                            </div>
                            <div className="quiz-options">
                                {questionData.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                                        onClick={() => setSelectedAnswer(index)}
                                    >
                                        <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                                        <span className="quiz-option-text">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="quiz-results">
                            <div className="quiz-score" style={{ marginBottom: '20px', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: selectedAnswer === questionData.correctAnswer ? '#22c55e' : '#ef4444' }}>
                                    {selectedAnswer === questionData.correctAnswer ? '🎉 Correct!' : '❌ Incorrect!'}
                                </p>
                            </div>
                            <div className="quiz-review-item" style={{ textAlign: 'left', padding: '15px', background: 'var(--panel-bg-light)', borderRadius: '8px' }}>
                                <p style={{ marginBottom: '10px' }}><strong>Question:</strong> {questionData.question}</p>
                                <p style={{ color: selectedAnswer === questionData.correctAnswer ? '#22c55e' : '#ef4444' }}>
                                    <strong>Your answer:</strong> {questionData.options[selectedAnswer]}
                                </p>
                                {selectedAnswer !== questionData.correctAnswer && (
                                    <p style={{ color: '#22c55e', marginTop: '10px' }}>
                                        <strong>Correct answer:</strong> {questionData.options[questionData.correctAnswer]}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mission-modal-footer">
                    {!showResult ? (
                        <button
                            className="mission-modal-continue"
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            className="mission-modal-continue"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuickQuizModal;
