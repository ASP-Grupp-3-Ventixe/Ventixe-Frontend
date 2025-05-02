import React from 'react'
import Badge from '../../components/badges/Badge';
import WarningOctagon from '../../../assets/images/WarningOctagon.svg';
import Breadcrumb from '../../components/breadcrumbs/breadcrumb';
import CheckCircle from '../../../assets/images/CheckCircle.svg';


const Dashboard = () => {
  return (
    <div className='dashboard-wrapper'>
      <h1>Dashboard</h1>
      <div className='dashboard-grid'>

      <Breadcrumb />

      <div className="space-y-2">
        <Badge label="Cancelled" bgColor="#E4E5F5" textColor="#9F9FA1" />
        <Badge label="Completed" bgColor="#F0E4FA" textColor="#A64AC9" />
        <Badge label="Confirmed" bgColor="#FCE4FA" textColor="#DA3CCF" />
        <Badge label="Pending" bgColor="#E4F0FA" textColor="#3C8FDA" />
        <Badge label="Unpaid" bgColor="#5562A2" textColor="#FFFFFF" icon={WarningOctagon} />
        <Badge label="Paid" bgColor="#FCD3FE" textColor="#37437D" icon={CheckCircle} />
    </div>
        

      </div>
    </div>
  )
}

export default Dashboard
