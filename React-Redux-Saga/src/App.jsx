import { Container } from 'semantic-ui-react'
import './App.css'
import MainHeader from './components/MainHeader'
import NewEntryForm from './components/NewEntryForm'
import DisplayBalance from './components/DisplayBalance'
import DisplayBalances from './components/DisplayBalances'
import { useEffect, useState } from 'react'
import EntryLines from './components/EntryLines'
import ModalEdit from './components/ModalEdit'
import { Provider, connect, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import Demo from './components/Demo'



export var initialEntries = [
  {
    id: 1,
    description: 'Work income',
    value: '1000.00',
    isExpense: false
  },
  {
    id: 2,
    description: 'Water bill',
    value: '120.00',
    isExpense: true
  },
  {
    id: 3,
    description: 'Rent',
    value: '100.00',
    isExpense: true
  },
  {
    id: 4,
    description: 'Power bill',
    value: '30.00',
    isExpense: true
  },
  {
    id: 5,
    description: 'Other expenses',
    value: '50.00',
    isExpense: false
  }
]

function App() {

  const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [total, setTotal] = useState(0);

  // const dispatch = useDispatch();


  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex(entry => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
      resetEntry();
    }
  }, [isOpen]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpenses = 0;
    entries.map(entry => {
      if (entry.isExpense) totalExpenses += Number(entry.value);
      else totalIncomes += Number(entry.value);
    })
    setTotalExpenses(totalExpenses);
    setTotalIncomes(totalIncomes);
    setTotal(totalIncomes - totalExpenses);
  }, [entries])

  function addEntry() {
    setEntries(prevEntries => [...prevEntries, { id: prevEntries.length + 1, description: description, value: value, isExpense: isExpense }])
    resetEntry();
  }

  function deleteEntry(id) {
    const ressult = entries.filter(entry => entry.id !== id);
    setEntries(ressult);
    resetEntry();
  }

  function editEntry(id) {
    if (id) {

      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];

      setEntryId(id);
      setValue(entry.value);
      setDescription(entry.description);
      setIsExpense(entry.isExpense);

      setIsOpen(true);
    }
  }

  function resetEntry() {
    setDescription('');
    setValue('');
    setIsExpense(false);
  }

  ///

  const transactionSlice = createSlice({
    name: 'transaction',
    initialState: initialEntries,
    reducers: {
      transactionSlice_addEntry() {
        console.log("Called");
        const newEntries = [...entries, {
          id: entries.length + 1,
          description: 'Expense for Redux',
          value: 200,
          isExpense: false
        }];
        return newEntries;
      }
    }
  })

  const store = configureStore({
    reducer: {
      transaction: transactionSlice.reducer
    },
  })

  const { transactionSlice_addEntry } = transactionSlice.actions;
  // console.log(transactionSlice_addEntry);

  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     transactionSlice_addEntry: () => dispatch(transactionSlice_addEntry()),
  //   };
  // };

  connect(null, { transactionSlice_addEntry: transactionSlice_addEntry })(App);

  // dispatch(transactionSlice_addEntry());

  /// 

  // dispatch(transactionSlice_addEntry());

  return (
    <Provider store={store}>
      <Container>
        <MainHeader
          title='Budget'
        />
        <DisplayBalance title='Your Balance : ' value={total} color='green' size='small' />
        <DisplayBalances totalExpenses={totalExpenses} totalIncomes={totalIncomes} />

        <MainHeader type='h3' title='History' />

        <EntryLines entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />

        <MainHeader type='h3' title='Add New Transaction' />
        <NewEntryForm
          addEntry={addEntry}
          description={description}
          value={value}
          isExpense={isExpense}
          setDescription={setDescription}
          setValue={setValue}
          setIsExpense={setIsExpense}
        />
        <ModalEdit
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addEntry={addEntry}
          description={description}
          value={value}
          isExpense={isExpense}
          setDescription={setDescription}
          setValue={setValue}
          setIsExpense={setIsExpense}
        />
      </Container >
      <Demo demo={transactionSlice_addEntry}></Demo>
    </Provider>
  )
}

export default App;


