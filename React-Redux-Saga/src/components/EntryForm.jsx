import { Checkbox, Form, Segment } from "semantic-ui-react";

function EntryForm(props) {

    const { description, value, isExpense, setDescription, setValue, setIsExpense } = props;

    return (
        <>
            <Form.Group>
                <Form.Input
                    icon='tags'
                    width={12}
                    label='Description'
                    placeholder='New shinny thing'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <br />
                <Form.Input
                    icon='dollar'
                    width={3}
                    label='Value'
                    placeholder='100.00'
                    iconPosition='left'
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </Form.Group>
            <Segment compact>
                <Checkbox
                    toggle
                    label='Is Expense'
                    checked={isExpense}
                    onChange={() => setIsExpense(prev => !prev)}
                />
            </Segment>
        </>
    )
}

export default EntryForm;