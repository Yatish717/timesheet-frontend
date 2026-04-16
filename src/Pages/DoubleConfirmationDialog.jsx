import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BiArchiveOut } from "react-icons/bi";

const GRID_SIZE = 9;
const GAME_DURATION = 12000; // 12 seconds
const MOLES_TO_WHACK = 5;

const DoubleConfirmationDialog = ({ onSubmit }) => {
    const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
    const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
    const [molePosition, setMolePosition] = useState(null);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

    useEffect(() => {
        let intervalId;
        if (gameActive && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1200);
                setMolePosition(Math.floor(Math.random() * GRID_SIZE));
            }, 1200);
        }
        return () => clearInterval(intervalId);
    }, [gameActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 || score === MOLES_TO_WHACK) {
            setGameActive(false);
            if (score === MOLES_TO_WHACK) {
                onSubmit();
                setIsSecondDialogOpen(false);
            }
        }
    }, [timeLeft, score, onSubmit]);

    const handleFirstConfirm = () => {
        setIsFirstDialogOpen(false);
        setIsSecondDialogOpen(true);
        startGame();
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setGameActive(true);
        setMolePosition(Math.floor(Math.random() * GRID_SIZE));
    };

    const handleMoleClick = (index) => {
        if (index === molePosition) {
            setScore((prevScore) => prevScore + 1);
            setMolePosition(Math.floor(Math.random() * GRID_SIZE));
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setIsFirstDialogOpen(true)}>
                Submit
                <BiArchiveOut className="ml-2" />
            </Button>

            <Dialog open={isFirstDialogOpen} onClose={() => setIsFirstDialogOpen(false)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsFirstDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleFirstConfirm} autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isSecondDialogOpen} onClose={() => setIsSecondDialogOpen(false)}>
                <DialogTitle>Final Confirmation: Whack-a-Mole</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Whack {MOLES_TO_WHACK} moles in {GAME_DURATION / 1000} seconds to confirm your action!
                    </DialogContentText>
                    <Typography align="center" gutterBottom>
                        Score: {score} / {MOLES_TO_WHACK} | Time left: {timeLeft / 1000}s
                    </Typography>
                    <Grid container spacing={1}>
                        {Array.from({ length: GRID_SIZE }).map((_, index) => (
                            <Grid item xs={4} key={index}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    style={{
                                        height: '64px',
                                        backgroundColor: index === molePosition ? 'gray' : 'black'
                                    }}
                                    onClick={() => handleMoleClick(index)}
                                    disabled={!gameActive}
                                >
                                    {index === molePosition ? '🐭' : ''}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSecondDialogOpen(false)}>Cancel</Button>
                    {!gameActive && score < MOLES_TO_WHACK && (
                        <Button onClick={startGame} autoFocus>
                            Try Again
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DoubleConfirmationDialog;