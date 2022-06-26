import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import Button from "../../components/UI/Butttons/Button";
import { InputField } from "../../components/UI/FormValidation/InputField";
import { SelectField } from "../../components/UI/FormValidation/SelectField";
import { TextAreaField } from "../../components/UI/FormValidation/TextAreaField";
import { getProductFormValidationSchema } from "../../components/UI/FormValidation/ValidationSchemas";
import authHeader from "../../helpers/authHeader";
import { StyledWrapper, TitleBar } from "./AddProduct.styled";

const AddProduct = () => {
  const navigate = useNavigate();
  let [properties, setProperties] = useState([])

  const submit = values => {
    axios
      .post('/products', values, { headers: authHeader() })
      .catch(error => {
        alert(error)
      })
    navigate('/products')
  }

  const fetchProductProperties = async () => {
    return await axios
      .get(`/products/properties`, { headers: authHeader() })
      .then(res => {
        setProperties(res.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
    fetchProductProperties()
  }, []);

  return (
    <Formik
      onSubmit={(values) => submit(values)}
      initialValues={{
        index: "",
        name: "",
        ean: "",
        category: "",
        unit: "",
        packagingType: {},
        inCollectivePackage: "",
        stackedOnPallet: "",
        minimumLevelOfStocks: "",
        preferredPalletType: {},
        description: "",
      }}
      validationSchema={getProductFormValidationSchema}
    >
      {(formik) => (
        <StyledWrapper>
          <Form>
            <TitleBar>Dane podstawowe</TitleBar>
            <InputField label="Index" name="index" type="text" />
            <InputField label="Nazwa" name="name" type="text" />
            <InputField label="Numer EAN" name="ean" type="text" />
            <SelectField
              label="Kategoria"
              name="category"
              placeholder="Wybierz kategorię"
              defaultOptions={properties.categories}

            />
            <SelectField
              label="Jednostka miary"
              name="unit"
              placeholder="Wybierz jednostkę"
              defaultOptions={properties.units}
            />
            <TitleBar>Dane składowania</TitleBar>
            <SelectField
              label="Typ opakowania"
              name="packagingType"
              placeholder="Wybierz opakowanie"
              defaultOptions={properties.packagingTypes}
            />
            <InputField
              label="Ilość w opakowaniu zbiorczym"
              min="0"
              step="any"
              name="inCollectivePackage"
              type="number"
            />
            <SelectField
              label="Preferowany typ palety"
              name="preferredPalletType"
              placeholder="Wybierz rodzaj palety"
              defaultOptions={properties.palletTypes}
            />
            <InputField
              label="Ilość opakowań na palecie"
              min="0"
              step="any"
              name="stackedOnPallet"
              type="number"
            />
            <InputField
              label="Minimalny poziom zapasów"
              min="0"
              step="any"
              name="minimumLevelOfStocks"
              type="number"
            />
            <TitleBar>Pozostałe</TitleBar>
            <TextAreaField
              label="Dodatkowe uwagi"
              name="description"
              rows="6"
            />
            <div>
              <Button type="submit" text="Zapisz"></Button>
            </div>
          </Form>
        </StyledWrapper>
      )}
    </Formik>
  );
};

export default AddProduct;