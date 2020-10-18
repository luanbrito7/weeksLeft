import React, { useState, useRef, useEffect } from 'react';
import './Weeks.css';

export default function Weeks ({age, death}) {
    const weeksInAYear = Math.round(365 / 7)
    const [totalWeeks, setTotalWeeks] = useState(weeksInAYear * death)
    const [livedWeeks, setLivedWeeks] = useState(weeksInAYear * age)
    const canvasRef = useRef(null)

    useEffect(() => {
        let context = canvasRef.current.getContext('2d')
        draw(context)
    }, [])

    function draw(context) {
        const canvas = context.canvas
        canvas.width  = window.innerWidth * 0.8
        canvas.height = window.innerHeight * 0.8
        context.fillStyle = '#000000'
        context.fillRect(0, 0, canvas.width, canvas.height)

        const remainingWeeks = totalWeeks - livedWeeks

        const squareSize = Math.sqrt(canvas.width * canvas.height / remainingWeeks) - 5
        const columns = Math.floor(canvas.width / squareSize)

        for (let i = 0, x = 0, y = 0; i < remainingWeeks; i++) {
            drawWeek(context, x * squareSize, y * squareSize, squareSize, squareSize)
            if (x >= columns - 1) {
                x = 0;
                y += 1;
            } else {
                x += 1;
            }
        }

        alert(`Você tem cerca de ${remainingWeeks} semanas, aproveite!!!`);
    }

    function drawWeek(context, xPos, yPos, width, height) {
        context.fillStyle = "#ffffff";
        context.fillRect(xPos, yPos, width, height);
        context.fillStyle='#000';
        context.strokeRect(xPos, yPos , width, height);
    }

    return (
        <div className="container">
            <canvas ref={canvasRef} id="canvas"></canvas>
        </div>
    )
}