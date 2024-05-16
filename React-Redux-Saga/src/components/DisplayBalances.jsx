import { Grid, Segment } from "semantic-ui-react"
import DisplayBalance from "./DisplayBalance"

function DisplayBalances({ totalExpenses, totalIncomes }) {
    return (
        <Segment textAlign='center'>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <DisplayBalance title='Income' value={totalIncomes} color='green' />
                    </Grid.Column>
                    <Grid.Column>
                        <DisplayBalance title='Expenses' value={totalExpenses} color='red' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default DisplayBalances