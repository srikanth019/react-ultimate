function WaterContainer ({ remaining, waterPercentage, percentage, width, height }) {
    return (
        <div
            className="bg-slate-50 border-[4px] text-blue-500 border-[#3456ce] m-3 rounded-t-md rounded-b-3xl flex flex-col   items-center justify-center"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {
                remaining > 0 ?
                    <div
                        className="flex flex-col items-center justify-center text-center flex-1"
                        id="remained"
                        style={{ height: "0px" }}
                    >
                        <span id="liters" className="font-semibold">{remaining} L</span>
                        <small> Remained</small>
                    </div>
                    : ""
            }
            {percentage > 0 ? <div
                className={`bg-blue-300 flex items-center justify-center font-bold text-3xl rounded-t-md rounded-b-3xl`}
                id="percentage"
                style={{ height: `${waterPercentage}px`, width: `${width - 7}px` }} //need to decrease width approx 7px
            >
                {percentage} %
            </div> : ""
            }
        </div>
    )
}

export default WaterContainer
