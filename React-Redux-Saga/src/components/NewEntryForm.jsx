import { Form } from "semantic-ui-react";
import ButtonSaveOrCancel from "./ButtonSaveOrCancel";
import { useState } from "react";
import EntryForm from "./EntryForm";

function NewEntryForm({ addEntry, description, setDescription, value, setValue, isExpense, setIsExpense }) {
    return (
        <Form unstackable>
            <EntryForm
                description={description}
                value={value}
                isExpense={isExpense}
                setDescription={setDescription}
                setValue={setValue}
                setIsExpense={setIsExpense}
            />
            <ButtonSaveOrCancel
                addEntry={addEntry}
            />
        </Form>
    )
}

export default NewEntryForm;