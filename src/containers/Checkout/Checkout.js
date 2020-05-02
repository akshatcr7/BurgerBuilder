import React , { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let summary = <Redirect to='/' />
        if(this.props.ing) {
            summary = (
              <div>
                <CheckoutSummary
                  ingredients={this.props.ing}
                  checkoutContinued={this.checkoutContinuedHandler}
                  checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route
                  path={this.props.match.path + "/contact-data"}
                  component={ContactData}
                />
              </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);