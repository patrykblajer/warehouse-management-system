import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import { InputField } from '../../components/UI/FormValidation/InputField'
import { getProductFormValidationSchema } from '../../components/UI/FormValidation/ValidationSchemas'
// import { StyledWrapper, TitleBar } from '../AddProduct/AddProduct.styled'
import { SelectField } from '../../components/UI/FormValidation/SelectField'
import { TextAreaField } from '../../components/UI/FormValidation/TextAreaField'
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon'
import authHeader from '../../helpers/authHeader'

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchProduct = () => {
        axios
            .get(`/products/${id}`, { headers: authHeader() })
            .then(result => {
                setProduct(result.data)
                setQuantity(result.data.quantity)
                setLoading(false)
            })
            .catch(error => {
                alert(error)
            })
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const submit = values => {
        axios.patch(`/products/${id}`, values, { headers: authHeader() }).catch(err => {
            setError(err.response.data.errors)
        })
        navigate('/products')
    }

    const fetchSelectOptions = async endPoint => {
        return await axios.get(`${endPoint}`, { headers: authHeader() }).then(result => {
            return result.data
        })
    }
    return (<Formik
        enableReinitialize
        onSubmit={values => submit(values)}
        initialValues={{
            index: product.index,
            name: product.name,
            ean: product.ean,
            category: product.category,
            unit: product.unit,
            packagingType: product.packagingType,
            inCollectivePackage: quantity.inCollectivePackage,
            stackedOnPallet: quantity.stackedOnPallet,
            minimumLevelOfStocks: quantity.minimumLevelOfStocks,
            preferredPalletType: product.preferredPalletType,
            description: product.description,
        }}
        validationSchema={getProductFormValidationSchema}>
        {formik => loading ? (<LoadingIcon></LoadingIcon>) : (

            <Form>

                <InputField label='Index' name='index' value={formik.values.index || ''} type='text' />
                <InputField label='Nazwa' name='name' value={formik.values.name || ''} type='text' />
                <InputField label='Numer EAN' name='ean' value={formik.values.ean || ''} type='text' />
                <SelectField
                    label='Kategoria'
                    name='category'
                    value={formik.values.category || ''}
                    placeholder='Wybierz kategorię'
                    loadOptions={() => fetchSelectOptions('/categories')}
                />
                <SelectField
                    label='Jednostka miary'
                    name='unit'
                    value={formik.values.unit || ''}
                    placeholder='Wybierz jednostkę'
                    loadOptions={() => fetchSelectOptions('/units')}
                />
                <SelectField
                    label='Typ opakowania'
                    name='packagingType'
                    value={formik.values.packagingType || ''}
                    placeholder='Wybierz opakowanie'
                    loadOptions={() => fetchSelectOptions('/packagingtype')}
                />
                <InputField
                    label='Ilość w opakowaniu zbiorczym'
                    name='inCollectivePackage'
                    value={formik.values.inCollectivePackage || ''}
                    min='0'
                    step='any'
                    type='number'
                />
                <SelectField
                    label='Preferowany typ palety'
                    name='preferredPalletType'
                    value={formik.values.preferredPalletType || ''}
                    placeholder='Wybierz rodzaj palety'
                    loadOptions={() => fetchSelectOptions('/pallets')}
                />
                <InputField
                    label='Ilość opakowań na palecie'
                    name='stackedOnPallet'
                    value={formik.values.stackedOnPallet || ''}
                    min='0'
                    step='any'
                    type='number'
                />
                <InputField
                    label='Minimalny poziom zapasów'
                    name='minimumLevelOfStocks'
                    value={formik.values.minimumLevelOfStocks || ''}
                    min='0'
                    step='any'
                    type='number'
                />
                <TextAreaField label='Opis' name='description' value={formik.values.description || ''}
                    rows='6' />
                <div>
                    <Button type='submit' text='Zapisz'></Button>
                </div>
            </Form>)}
    </Formik>)
}
export default EditProduct