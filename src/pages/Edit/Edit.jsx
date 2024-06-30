import './edit.css'
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EarthForms({address}) {

    return (
        <div className="FormsContainer">

            <div className="left">
                <label htmlFor="label">Etiqueta local</label>
                <input type="text" name="label" id="label" placeholder={address?.label}/>

                <label htmlFor="name">Nome completo</label>
                <input type="text" name="name" id="name" placeholder={address?.fullName}/>

                <label htmlFor="phone">Telefone</label>
                <input type="text" name="phone" id="phone" placeholder={address?.phone}/>

                <label htmlFor="inputAddress">Endereço</label>
                <input type="text" name="inputAddress" id="inputAddress" placeholder={address?.addressLine}/>
            </div>

            <div className="right">
                <label htmlFor="country">País</label>
                <input type="text" name="country" id="country" placeholder={address?.country}/>

                <label htmlFor="state">Estado</label>
                <input type="text" name="state" id="state" placeholder={address?.state}/>

                <label htmlFor="city">Cidade</label>
                <input type="text" name="city" id="city" placeholder={address?.city}/>
            </div>
        </div>
    )
}

function MarsForms({address}) {

    return (
        <div className="FormsContainer">

            <div className="left">
                <label htmlFor="label">Etiqueta local</label>
                <input type="text" name="label" id="label" placeholder={address?.label}/>

                <label htmlFor="name">Nome completo</label>
                <input type="text" name="name" id="name" placeholder={address?.fullName}/>

                <label htmlFor="phone">Telefone</label>
                <input type="text" name="phone" id="phone" placeholder={address?.phone}/>

                <label htmlFor="lote">Lote</label>
                <input type="text" name="lote" id="lote" placeholder={address?.addressLine}/>
            </div>
        </div>
    )
}

const EditPage = () => {
    const { id, addressPlanet } = useParams();
    const [planet, setPlanet] = useState(addressPlanet);
    const [myAddress, setMyAddress] = useState(true);

    const [addressList, setAddressList] = useState([]);

    const [currentAddress, setCurrentAddress] = useState(null);

    const [isMain, setIsMain] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const addressListStorage = JSON.parse(localStorage.getItem('addressList'));
        setAddressList(addressListStorage)
        
        setMyAddress((addressListStorage.find((addr) => (addr?.id == id))).myAddress === 'send-address' ? false : true)
        setIsMain((addressListStorage.find((addr) => (addr?.id == id))).main)
      }, [])

    useEffect(() => {
        setCurrentAddress(addressList.find((addr) => (addr?.id == id)))
    })

    function editAddress() {
        let result;

        const label = document.getElementById('label').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById((planet === 'Terra') ? 'inputAddress' : 'lote').value;

        if(planet === 'Terra') {
            const country = document.getElementById('country').value;
            const state = document.getElementById('state').value;
            const city = document.getElementById('city').value;

            result = {
                id: id,
                label: (label?.length > 0) ? label : currentAddress.label,
                fullName: (name?.length > 0) ? name : currentAddress.name,
                phone: (phone?.length > 0) ? phone : currentAddress.phone,
                planet: currentAddress.planet,
                addressLine: (address?.length > 0) ? address : currentAddress.addressLine,
                city: (city?.length > 0) ? city : currentAddress.city,
                country: (country?.length > 0) ? country : currentAddress.country,
                state: (state?.length > 0) ? state : currentAddress.state,
                myAddress: (myAddress === true) ? 'billing-address' : 'send-address',
                main: isMain === 1 ? true : false
            }
        } else {
            result = {
                id: id,
                label: (label?.length > 0) ? label : currentAddress.label,
                fullName: (name?.length > 0) ? name : currentAddress.name,
                phone: (phone?.length > 0) ? phone : currentAddress.phone,
                planet: currentAddress.planet,
                addressLine: (address?.length > 0) ? address : currentAddress.addressLine,
                myAddress: (myAddress === true) ? 'billing-address' : 'send-address',
                main: isMain === 1 ? true : false
            }
        }

        let newAddressList = addressList.map((address) => {
            if(address.id == id){
                address = result
            }
            return address
        })

        console.log(newAddressList)

        localStorage.setItem('addressList', JSON.stringify(newAddressList))

        setTimeout(() => {
            navigate('/');
          }, 500);
    }

    

    function handleMainCheckBoxClick(res) {
        setIsMain(res);
    }

    return ( 
        <div className="addContainer">
            <Header title={`Edit address`}/>
            <div className="addContent">
                <div className="planetButton">
                    <Button text={'Meu endereço'} type={`outline-primary ${myAddress === true ? 'active' : ''}`} 
                    onClick={() => {setMyAddress(true)}}/>
                    <Button text={'Endereço de envio'} type={`outline-primary ${myAddress === false ? 'active' : ''}`} 
                    onClick={() => {setMyAddress(false)}}/>
                </div>


                <div className="Forms">
                    {
                        (planet === 'Terra') ? <EarthForms address={currentAddress} /> : <MarsForms address={currentAddress}/>
                    }
                    <div className="mainOptions">
                        <label htmlFor="" className='mainLabel'>Endereço padrão</label>
                        <div className="mainCheckbox">
                            <div className="main">
                                <input type="checkbox" name="mainOption" id="mainOption" value={true} className='mainOption' checked={isMain} 
                                onClick={() => {handleMainCheckBoxClick(1)}}/> <span>Sim</span>
                            </div>

                            <div className="not-main">
                                <input type="checkbox" name="mainOptionNo" id="mainOptionNo" value={false} className='mainOption' checked={!isMain} 
                                onClick={() => {handleMainCheckBoxClick(0)}}/> <span>Não</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer saveChangesClick={editAddress}/>
        </div>
     );
}
 
export default EditPage;