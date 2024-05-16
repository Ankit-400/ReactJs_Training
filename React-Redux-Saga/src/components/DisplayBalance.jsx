import { Statistic } from "semantic-ui-react";

function DisplayBalance({ title, value, color, size = 'tiny' }) {
    return (
        <Statistic size={size} color={color}>
            <Statistic.Label style={{ textAlign: 'center' }}>{title}</Statistic.Label>
            <Statistic.Value>{value}</Statistic.Value>
        </Statistic>
    )
}

export default DisplayBalance;