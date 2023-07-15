import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({activity: selectedActivity,closeForm,createOrEdit}: Props) {

    const initialState = selectedActivity ?? {  // declaring the initial Form state for field validation, When we click on create activity button , All the fields in the form will initialised to Empty Strings.
        id: '',
        title: '',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''

    }
    const [activity,setActivity] = useState(initialState);

    function handleSubmit() {       //function to handle submit form button 
        createOrEdit(activity);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {  //function to handle the change we do in the fields of the form. for eg- we might change the title of an activity. this change event has to be handeled and it is handled here.
        const {name,value} = event.target; // de-structring the value using name
        setActivity({...activity /* Here ... means the preceding values of object activity selected */,[name]: value})
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Tiltle' value={activity.title  /* Value from DB will be displayed in form field Title. */} name='title' onChange={handleInputChange}/>
                <Form.Input placeholder='Description' value={activity.description /* Value from DB will be displayed in form field Description. */} name='description' onChange={handleInputChange /* If we get any error with respect to HTMLInputElement cannot coerce to HTMLTextAreaElement or any other type, then update the parameter of ChangeEvent<> in Line 26. */}/>
                <Form.Input placeholder='Category' value={activity.category  /* Value from DB will be displayed in form field Category. */} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date  /* Value from DB will be displayed in form field Date. */} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city  /* Value from DB will be displayed in form field City. */} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue  /* Value from DB will be displayed in form field Venue. */} name='venue' onChange={handleInputChange}/>
                <Button floated="right" positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}

