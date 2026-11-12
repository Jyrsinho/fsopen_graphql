import {useQuery} from "@apollo/client/react";
import {RECOMMENDATIONS} from "./graphql/queries.js";

export const Recommendations = ({show}) => {

    const recommendationResult = useQuery(RECOMMENDATIONS)
    if (recommendationResult.loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    const recommendations = recommendationResult.data.recommendations
    if (!recommendations) return (
        <div>
            no recommendations
        </div>
    )

    if (!show) return null
    
    console.log('recommendations', recommendations)
    const randomID = recommendations[0]._id
    console.log('randomID', randomID)    

    return (
        <div>
            <h3>recommendations:</h3>
            <h4>books in your favorite genre</h4>
            <table>
                <thead>
                <tr>
                    <th>title</th>
                    <th>published</th>
                    <th>author</th>
                </tr>
                </thead>
                <tbody>
                {recommendations.map(recommendation => (
                    <tr key={recommendation.id}>
                        <td>{recommendation.title}</td>
                        <td>{recommendation.published}</td>
                        <td>{recommendation.author.name}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>

    )
}

export default Recommendations;