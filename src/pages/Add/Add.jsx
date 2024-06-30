import './add.css'
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EarthForms() {
    const [isMain, setIsMain] = useState(0);

    function handleMainCheckBoxClick(res) {
        setIsMain(res);
    }

    return (
        <div className="FormsContainer">

            <div className="left">
                <label htmlFor="label">Etiqueta local</label>
                <input type="text" name="label" id="label" placeholder='Ex: Casa, Escritório'/>

                <label htmlFor="name">Nome completo</label>
                <input type="text" name="name" id="name" placeholder='Ex: Fulano Silva'/>

                <label htmlFor="phone">Telefone</label>
                <input type="text" name="phone" id="phone" placeholder='Ex: 29837432489'/>

                <label htmlFor="inputAddress">Endereço</label>
                <input type="text" name="inputAddress" id="inputAddress" placeholder='Ex: Rua Tany, 321'/>
            </div>

            <div className="right">
                <label htmlFor="country">País</label>
                <input type="text" name="country" id="country" placeholder='Ex: Holanda'/>

                <label htmlFor="state">Estado</label>
                <input type="text" name="state" id="state" placeholder='Ex: Holanda do Norte'/>

                <label htmlFor="city">Cidade</label>
                <input type="text" name="city" id="city" placeholder='Ex: Amsterdan'/>
            </div>
        </div>
    )
}

function MarsForms() {

    return (
        <div className="FormsContainer">

            <div className="left">
                <label htmlFor="label">Etiqueta local</label>
                <input type="text" name="label" id="label" placeholder='Ex: Casa, Escritório'/>

                <label htmlFor="name">Nome completo</label>
                <input type="text" name="name" id="name" placeholder='Ex: Fulano Silva'/>

                <label htmlFor="phone">Telefone</label>
                <input type="text" name="phone" id="phone" placeholder='Ex: 29837432489'/>

                <label htmlFor="lote">Lote</label>
                <input type="text" name="lote" id="lote" placeholder='Ex: 1234'/>
            </div>
        </div>
    )
}

const AddPage = () => {
    const [planet, setPlanet] = useState('Terra');
    const [myAddress, setMyAddress] = useState(true);

    const [addressList, setAddressList] = useState([]);

    const [isMain, setIsMain] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const addressListStorage = JSON.parse(localStorage.getItem('addressList'));
    
        setAddressList(addressListStorage)
      }, [])

    function handleChangePlanet(planetOption) {
        setPlanet(planetOption)
    }

    function addAddress() {
        let result;


        const label = document.getElementById('label').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById((planet === 'Terra') ? 'inputAddress' : 'lote').value;

        const id = (addressList?.length > 0) ? addressList[addressList?.length - 1].id + 1 : 0;
        
        if(planet === 'Terra') {
            const country = document.getElementById('country').value;
            const state = document.getElementById('state').value;
            const city = document.getElementById('city').value;

            result = {
                id: id,
                label: label,
                fullName: name,
                phone: phone,
                planet: planet,
                addressLine: address,
                city: city,
                country: country,
                state: state,
                myAddress: (myAddress === true) ? 'billing-address' : 'send-address',
                main: isMain === 1 ? true : false
            }
        } else {
            result = {
                id: id,
                label: label,
                fullName: name,
                phone: phone,
                planet: planet,
                addressLine: address,
                myAddress: (myAddress === true) ? 'billing-address' : 'send-address',
                main: isMain === 1 ? true : false
            }
        }

        const addressListUpdate = (addressList) ? addressList : [result]
        addressListUpdate.push(result)

        localStorage.setItem('addressList', JSON.stringify(addressListUpdate))

        setTimeout(() => {
            navigate('/');
          }, 500);
    }

    

    function handleMainCheckBoxClick(res) {
        setIsMain(res);
    }

    return ( 
        <div className="addContainer">
            <Header title={'Add address'}/>
            <div className="addContent">
                <div className="planetButton">
                    <Button text={'Terra'} type={'primary'} onClick={() => {handleChangePlanet('Terra')}}/>
                    <Button text={'Marte'} type={'mars'} onClick={() => {handleChangePlanet('Marte')}}/>
                    <div className="separator"></div>
                    <Button text={'Meu endereço'} type={`outline-primary ${myAddress === true ? 'active' : ''}`} 
                    onClick={() => {setMyAddress(true)}}/>
                    <Button text={'Endereço de envio'} type={`outline-primary ${myAddress === false ? 'active' : ''}`} 
                    onClick={() => {setMyAddress(false)}}/>
                </div>


                <div className="Forms">
                    {(planet === 'Terra') ? <EarthForms /> : <MarsForms />}
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
            <Footer saveChangesClick={addAddress}/>
        </div>
     );
}
 
export default AddPage;