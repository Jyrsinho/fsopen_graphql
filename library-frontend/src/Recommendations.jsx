import {useQuery} from "@apollo/client/react";
import {ME, RECOMMENDATIONS} from "./graphql/queries.js";

export const Recommendations = ({show}) => {
    const meResult = useQuery(ME)

    const recommendationResult = useQuery(RECOMMENDATIONS)
    if (recommendationResult.loading || meResult.loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    const recommendations = recommendationResult.data.recommendations

    if (!show) return null
    
    return (
        <div>
            <h3>recommendations:</h3>
            <h4>books in your favorite genre {meResult.data.me.favoriteGenre}</h4>
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