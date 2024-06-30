import { useEffect, useState } from 'react';

import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Button from './components/Button/Button';

import { IoSearch } from "react-icons/io5";

function AddressOptionBox({address, checked, id, onClick, onDeleteClick, planet}) {

  return (
    <div className="addressBoxContainer" key={id} id={id}>
        <span className="label">{address.label}</span>
        <h3>{address.fullName}</h3>

        <h5>{address.phone}</h5>

        {
          (address.planet === 'Terra') ? 
          <h5 className='secondary'>{address.addressLine}</h5> :
          <h5 className='secondary'>{address.lote}</h5>
        }
        
        <div className="buttons">
          <Button text={'Edit address'} type={'outline-secondary'} to={`/edit/${planet}/${id}`}/>
          <Button text={'Delete address'} type={'outline-secondary'} onClick={onDeleteClick}/>
        </div>

        <input type="checkbox" className='addressCheckbox' checked={checked} onClick={onClick}/>
    </div>
  )
}


function App() {

  const [selectedAddressOption, setSelectedAddressOption] = useState('send-address');

  const [addressList, setAddressList] = useState([]);

  const [isChecked, setIsChecked] = useState(-1);

  useEffect(() => {
    const addressListStorage = JSON.parse(localStorage.getItem('addressList'));

    setAddressList(addressListStorage)

    if(addressList?.length > 0) {
        for(let addr of addressList) {
          if(addr.main === true) { setIsChecked(addr.id) }
        }
    }
  }, [])

  

  function handleAddressOptions(targetName) {
    setSelectedAddressOption(targetName)
  }

  function handleCheckboxClick(id) {
    setIsChecked(id)
  }

  function handleDeleteAddress(id) {
    let newAddressList = addressList.filter((address) => (address.id !== id));
    localStorage.setItem('addressList', JSON.stringify(newAddressList));
    setAddressList(newAddressList)
  }

  function handleSearch(e){
    const value = e.target.value;
    

    if(value.length === 0) setAddressList(JSON.parse(localStorage.getItem('addressList')))
    else {
      let newAddressList = addressList.filter((address) => (address.fullName?.includes(value) || 
        address.country?.includes(value) || address.city?.includes(value) || address.lote?.includes(value) || 
        address.state?.includes(value) || address.addressLine?.includes(value) || address.label?.includes(value)))

      setAddressList(newAddressList)
    }

  }

  return (
    <div className="container">
        <Header title={'Address'}/>

        <div className="content">
          <div className="address-options">
            <button className={`${(selectedAddressOption) === 'send-address' ? 'active' : '' } address-option`} name='send-address' onClick={() => handleAddressOptions('send-address')}>
              Endereço de envio
            </button>
            <button className={`${(selectedAddressOption) === 'billing-address' ? 'active' : '' } address-option`} name='billing-address' onClick={() => handleAddressOptions('billing-address')}>
              Endereço de cobrança
            </button>
          </div>

          <div className="searchContainer">
            <div className="searchbar">
              <IoSearch className='searchIcon' size={18}/>
              <input type="text" name="addressSearchInput" id="addressSearchInput" placeholder='Search the address here' 
              onChange={handleSearch}/>
            </div>

            <Button text={'Add address'} type={'outline-primary'} to="/add"/>
          </div>

          <div className="addressListContainer">
            <h4>Address List</h4>

            <div className="address-list">
              {(addressList) ? 
              addressList.map((item) => {
                if(selectedAddressOption === item.myAddress) {
                  return <AddressOptionBox key={item.id} id={item.id} address={item} checked={isChecked !== -1 ? isChecked === item.id : item.main} onClick={() => {handleCheckboxClick(item.id)}} onDeleteClick={() => {handleDeleteAddress(item.id)}} 
                  planet={item.planet}/>
                } else {
                  return null;
                }
                
              }) : <h2>Nenhum endereço cadastrado {addressList}</h2>}
            </div>
          </div>

        </div>

        <Footer />
    </div>
  );
}

export default App;
