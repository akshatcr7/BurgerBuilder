import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIPCODE",
        },
        value: "",
        validation: {
            required: true,
            minLength: 6,
            maxLength: 6
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "Cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  inputChnagedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    };
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched=true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  checkValidity = (value, rules ) => {

    let isValid = true;

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            elementType={formElement.config.elementType}
            value={formElement.config.value}
            elementConfig={formElement.config.elementConfig}
            key={formElement.id}
            changed={(event) => this.inputChnagedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
