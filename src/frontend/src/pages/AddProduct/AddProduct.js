import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import {Form, Formik} from 'formik'
import {InputField} from '../../components/UI/FormValidation/InputField'
import {SelectField} from '../../components/UI/FormValidation/SelectField'
import {TextAreaField} from '../../components/UI/FormValidation/TextAreaField'
import {getProductFormValidationSchema} from '../../components/UI/FormValidation/ValidationSchemas'
import {StyledWrapper, TitleBar} from './ProductForm.styled'

const AddProduct = () => {
    const navigate = useNavigate()
    let [error, setError] = useState([])

    const submit = values => {
        axios.post('/products', values).catch(err => {
            setError(err.response.data.errors)
        })
        navigate('/products')
    }

    const fetchSelectOptions = async endPoint => {
        return await axios.get(`${endPoint}`).then(result => {
            return result.data
        })
    }

    return (<Formik
        onSubmit={values => submit(values)}
        initialValues={{
            index: '',
            name: '',
            ean: '',
            category: '',
            unit: '',
            inCollectivePackage: '',
            stackedOnPallet: '',
            minimumLevelOfStocks: '',
            description: '',
        }}
        validationSchema={getProductFormValidationSchema}>
        (<StyledWrapper>
        <Form>
            <TitleBar>Dane podstawowe</TitleBar>
            <InputField label='Index' name='index' type='text'/>
            <InputField label='Nazwa' name='name' type='text'/>
            <InputField label='Numer EAN' name='ean' type='text'/>
            <SelectField
                label='Kategoria'
                name='category'
                placeholder='Wybierz kategorię'
                loadOptions={() => fetchSelectOptions('/categories')}
            />
            <SelectField
                label='Jednostka miary'
                name='unit'
                placeholder='Wybierz jednostkę'
                loadOptions={() => fetchSelectOptions('/units')}
            />
            <TitleBar>Dane składowania</TitleBar>
            <SelectField
                label='Typ opakowania'
                name='packagingType'
                placeholder='Wybierz opakowanie'
                loadOptions={() => fetchSelectOptions('/packagingtype')}
            />
            <InputField
                label='Ilość w opakowaniu zbiorczym'
                min='0'
                step='any'
                name='inCollectivePackage'
                type='number'
            />
            <SelectField
                label='Preferowany typ palety'
                name='preferredPalletType'
                placeholder='Wybierz rodzaj palety'
                loadOptions={() => fetchSelectOptions('/pallets')}
            />
            <InputField label='Ilość opakowań na palecie' min='0' step='any' name='stackedOnPallet'
                        type='number'/>
            <InputField label='Minimalny poziom zapasów' min='0' step='any' name='minimumLevelOfStocks'
                        type='number'/>
            <TitleBar>Pozostałe</TitleBar>
            <TextAreaField label='Opis' name='description' rows='6'/>
            <div>
                <Button type='submit' text='Zapisz'></Button>
            </div>
        </Form>
    </StyledWrapper>)
    </Formik>)
}

export default AddProduct
