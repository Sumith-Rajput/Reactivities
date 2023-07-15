import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'; // Importing uuid as third party library , we need to run npm install uuid
function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data)
    })
  }, [])

  function handleSelectActivity(id: string)
  {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateEditActivity(activity: Activity) /* Function to handle Edit/Create of an Activity, When we click on Edit Activity button or Create Activity button this function will be invoked first. */
   {
    activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id),activity]) //If the activity passed to this function exists, then we need to perform edit. So we will pick the existing activity and update it with passed one as in paramter.
    : setActivities([...activities,{ ...activity, id:uuid()}]);  // alternative will be there is no activity as passed, then we just create the new activity which is passed. We are giving ID which is PK in DB a unique value using uuid().
    setEditMode(false); // after creating or updating we are disabling editmode of that particular activity. 
    setSelectedActivity(activity);  // and also updating our setSelectedActivity() function which is nothing but returns selected activity and might be used in other cases as well.
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }
  return (
    <>
        
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateEditActivity}
          deleteActivity={handleDeleteActivity}
          />
        </Container>
        
    </>
  );
}

export default App;
