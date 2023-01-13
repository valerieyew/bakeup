import React, { Component, useState, useEffect } from 'react';


class AcceptOrderButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: props.key,
        }
    }

    acceptOrder() {

    }

    render() {
        return (
            <>
                <button>
                    <svg className="w-6 h-6" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <button>
                <svg className="w-6 h-6" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </>
        )

    }
}

export default AcceptOrderButton;