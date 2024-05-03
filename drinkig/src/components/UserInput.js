import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../features/waterSlice";

function UserInput () {
    const { capacity, totalCups } = useSelector((store) => store.water)
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        const newCapacity = parseFloat(data.capacity);
        const newTotalCups = parseFloat(data.totalCups);
        dispatch(updateQuantity({ capacity: newCapacity, totalCups: newTotalCups }));
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg m-5 mr-4 ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label htmlFor="capacity" className="text-sm font-bold mb-2">Select capacity of container: (L)</label>
                <select
                    id="capacity"
                    name="capacity"
                    className=" bg-white border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("capacity")}
                    defaultValue={capacity}
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <label htmlFor="totalCups" className="text-sm font-bold mb-2">Select number of Cups: (ML)</label>
                <select
                    id="totalCups"
                    name="totalCups"
                    className=" bg-white border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("totalCups")}
                    defaultValue={totalCups}
                >
                    {Array.from({ length: 20 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
        </div>
    );
}

export default UserInput;


