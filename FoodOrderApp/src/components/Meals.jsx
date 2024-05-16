import MealItem from "./MealItem";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";


const config = {};
export default function Meals() {
    const {
        data: mealList,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', config, []);

    // console.log(mealList);

    if (isLoading) return <p>Fetching meals...</p>;

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals" key="hii">
            {
                mealList.map(meal => (
                    <MealItem key={meal.id} meal={meal} />
                ))
            }
        </ul>
    );
}