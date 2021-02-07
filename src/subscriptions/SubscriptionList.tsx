import React, {useState} from "react";
import {ISubscriptionListInterface} from "./subscriptionListInterface";

export const SubscriptionList: React.FC<ISubscriptionListInterface> = (props) => {
    const {subscriptions, onClose} = props;


    return (
        <div className='posts card-body text-center col-sm-3'>
            <p className="card-text card-header" onClick={onClose}> back </p>
            {subscriptions.map(user =>
                <p className="card-text card-header"> {user}</p>
            )}
        </div>
    );
}
