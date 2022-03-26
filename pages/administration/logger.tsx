import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ActionType, ApplicationType, AuditLog, GetUsersResults } from '../../models/types'
import Table from '../../components/table';

const Logger: NextPage<{
    users: AuditLog[],
    changedUsers: AuditLog[],
    slicedData: AuditLog[],
    headers: any[]
}> = ({ users, changedUsers, slicedData, headers }) => {
    return (
        <div>
            <Head>
                <title>Logger</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='logger-container'>
                <Table headers={headers} slicedData={slicedData} changedUsers={changedUsers} users={users} />
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
    const users: GetUsersResults = await res.json();
    const actionTypes = Object.values(ActionType);
    const applicationTypes = Object.values(ApplicationType);

    return {
        props: {
            users: users.result.auditLog,
            changedUsers: users.result.auditLog,
            slicedData: users.result.auditLog,
            actionTypes: actionTypes,
            applicationTypes: applicationTypes,
            headers: [
                { key: 'logId', lable: 'Log ID' },
                { key: 'applicationType', lable: 'Application Type' },
                { key: 'applicationId', lable: 'Application ID' },
                { key: 'actionType', lable: ' Action' },
                { key: 'source', lable: 'Action Details' },
                { key: 'creationTimestamp', lable: 'Date : Time' }
            ]
        }
    }
}

export default Logger
