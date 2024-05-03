import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import WaterContainer from "./WaterContainer";

function DrinkWater () {
    const { capacity, totalCups } = useSelector((store) => store.water)
    const [{ selectedCup, remaining, percentage, waterPercentage }, setState] = useState({
        selectedCup: null,
        remaining: capacity,
        percentage: 0,
        waterPercentage: 0,
    });

    const width = 165;
    const height = 350;

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            remaining: capacity,
            waterPercentage: 0,
            percentage: 0,
            selectedCup: null,
        }));
    }, [capacity, totalCups]);

    const capacityOfCup = (capacity / totalCups).toFixed(2)

    //Water per cup in ML
    const waterPerCup = ((capacity * 1000) / totalCups).toFixed(2);

    const handleCupClick = (index) => {
        const newSelectedCup = index === selectedCup ? index - 1 : index;
        const percentage = Math.round((newSelectedCup / totalCups) * 100 * 100) / 100;
        const waterLevel = Math.round((newSelectedCup / totalCups) * height * 100) / 100;
        const remaining = percentage === 100 ? 0 : (capacity - newSelectedCup * capacityOfCup).toFixed(2);
        setState({
            selectedCup: newSelectedCup,
            waterPercentage: waterLevel.toFixed(2),
            percentage,
            remaining,
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-2xl mb-2 p-2 font-semibold">Drink Water</div>
                <div className="text-xl">Capacity: {capacity} Liters</div>
                <WaterContainer
                    remaining={remaining}
                    waterPercentage={waterPercentage}
                    percentage={percentage}
                    width={width}
                    height={height}
                />
            </div>
            <div className="flex flex-col items-center mt-6">
                <div className="text-xl">Select how many glasses of water you have drank:</div>
                <div className="grid grid-cols-5 gap-10 m-4 ml-7">
                    {Array.from({ length: totalCups }, (_, i) => (
                        <Cup
                            key={i + 1}
                            index={i + 1}
                            isSelected={i + 1 <= selectedCup}
                            handleClick={() => handleCupClick(i + 1)}
                            waterPerCup={waterPerCup}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

function Cup ({ isSelected, handleClick, waterPerCup }) {
    return (
        <div className={`w-[75px] h-[100px] ${isSelected ? 'bg-blue-300 text-white' : 'bg-white text-blue-500'} text-center p-2 pt-6 rounded-b-2xl rounded-t-md border-4 border-[#3456ce]`} onClick={handleClick}>
            {waterPerCup} ml
        </div>
    );
}

export default DrinkWater
