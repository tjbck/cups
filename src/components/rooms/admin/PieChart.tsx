import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';

type PieChartProps = {
    users: UserType[]
}

type CountObjectType = {
    red?: number
    yellow?: number
    green?: number
    inactive?: number
}

type UserType = {
    sid: string
    colour: string | null
}

const PieChart = ({ users }: PieChartProps) => {

    const [chart, setChart] = useState(null)
    const canvasRef = useRef(null)


    useEffect(() => {
        if (canvasRef.current != null) {
            const myChart = new Chart(canvasRef.current, {
                type: 'pie',
                data: {
                    labels: ['Inactive', 'Green', 'Yellow', 'Red'],
                    datasets: [
                        {
                            data: [0, 0, 0, 0],
                            backgroundColor: [
                                "#e5e7eb",
                                "#4ade80",
                                "#facc15",

                                "#f87171",
                            ],
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Cups Pie Chart'
                        }
                    }
                },
            });

            setChart(myChart);
            return () => {
                myChart.destroy()
            }
        }

    }, [canvasRef])

    useEffect(() => {
        if (chart !== null) {
            console.log(users)

            const count = users.reduce((a: CountObjectType, user, i, arr) => {
                if (user.colour == 'red') {
                    a.red = (a.red || 0) + 1
                } else if (user.colour == 'yellow') {
                    a.yellow = (a.yellow || 0) + 1
                } else if (user.colour == 'green') {
                    a.green = (a.green || 0) + 1
                } else {
                    a.inactive = (a.inactive || 0) + 1
                }
                return a
            }, {})

            chart.data.datasets[0].data = [count.inactive, count.green, count.yellow, count.red]
            chart.update();
        }

    }, [chart, users])


    return (
        <><canvas ref={canvasRef} id="myChart"></canvas></>
    )
}

export default PieChart