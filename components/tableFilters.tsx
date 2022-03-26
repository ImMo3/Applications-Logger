import { withRouter, NextRouter } from 'next/router'
import React from "react"
import { MouseEventHandler } from "react"
import { ActionType, ApplicationType } from "../models/types"

class TableFilters extends React.Component<{ onClick: MouseEventHandler<any>, router: NextRouter }, { filterValues: any, onClick: MouseEventHandler<any> }> {

    actionTypes = Object.values(ActionType)
    applicationTypes = Object.values(ApplicationType)


    constructor(props: any) {
        super(props);
        this.state = {
            filterValues: {
                applicationId: '',
                actionType: '',
                applicationType: '',
                from: '',
                to: ''
            },
            onClick: (filterValues: any) => { }
        };
    }

    componentDidMount() {
        setTimeout(() => {
            const queryParams = this.props.router.query
            this.setState((state: any) => ({
                filterValues: {
                    applicationId: queryParams?.applicationId || '',
                    actionType: queryParams?.actionType || '',
                    applicationType: queryParams?.applicationType || '',
                    from: queryParams?.from || '',
                    to: queryParams?.to || ''
                },
            }))
            this.props.onClick(this.state.filterValues)
        }, 200)
    }

    applyFilter = ($event: any, key: string) => {
        this.setState({ filterValues: { ...this.state.filterValues, [key]: $event.target.value } })
    }

    submitFilter = () => {
        this.props.router.push({ pathname: '/administration/logger', query: { ...this.state.filterValues } })
        this.props.onClick(this.state.filterValues)
    }

    render() {
        return (
            <div className="filter-container">
                <div>
                    <label htmlFor="applicationId">Application ID</label>
                    <input value={this.state.filterValues.applicationId} placeholder="eg. 219841/2021" name="applicationId" type="text" onChange={(e) => this.applyFilter(e, 'applicationId')} />
                </div>

                <div>
                    <label htmlFor="actionType">Action Type</label>
                    <select value={this.state.filterValues.actionType} name="actionType" onChange={(e) => this.applyFilter(e, 'actionType')} >
                        <option key={'empty_null'} value={''}></option>
                        {this.actionTypes.map(action => (
                            <option key={action} value={action}>{action}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="applicationType">Application Type</label>
                    <select value={this.state.filterValues.applicationType} name="applicationType" onChange={(e) => this.applyFilter(e, 'applicationType')} >
                        <option key={'empty_null'} value={''}></option>
                        {this.applicationTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="fromDate">From Date</label>
                    <input value={this.state.filterValues.from} placeholder="Select Date" name="fromDate" type="datetime-local" onChange={(e) => this.applyFilter(e, 'from')} />
                </div>
                <div>
                    <label htmlFor="toDate">To Date</label>
                    <input value={this.state.filterValues.to} placeholder="Select Date" name="toDate" type="datetime-local" onChange={(e) => this.applyFilter(e, 'to')} />
                </div>
                <div>
                    <label htmlFor="filterButton">&nbsp;</label>
                    <button name="filterButton" className="submit-button" disabled={this.state.filterValues.from && this.state.filterValues.from !== '' && !this.state.filterValues.to && this.state.filterValues.to === ''} onClick={this.submitFilter}>Search Logger</button>
                </div>
            </div>
        );
    }
}

export default withRouter(TableFilters)