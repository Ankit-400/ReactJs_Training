import { Button, Modal } from "semantic-ui-react";
import EntryForm from "./EntryForm";

function ModalEdit({ isOpen, setIsOpen, description, setDescription, value, setValue, isExpense, setIsExpense }) {
    return <Modal open={isOpen}>
        <Modal.Header>Edit Entry..!!</Modal.Header>
        <Modal.Content>
            <EntryForm
                description={description}
                value={value}
                isExpense={isExpense}
                setDescription={setDescription}
                setValue={setValue}
                setIsExpense={setIsExpense}
            />
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={() => setIsOpen(false)} primary>Save</Button>
        </Modal.Actions>
    </Modal>
}

export default ModalEdit;