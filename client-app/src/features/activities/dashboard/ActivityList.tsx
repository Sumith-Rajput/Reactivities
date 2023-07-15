import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities,selectActivity,deleteActivity}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => 
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()/* Here we are passing a function without any params so that selectActivity function shouldn't get called before even we click on view button. */ => selectActivity(activity.id) } floated='right' content='View' color="blue" />  
                                <Button onClick={()/* Here we are passing a function without any params so that deleteActivity function shouldn't get called before even we click on delete button. */ => deleteActivity(activity.id) } floated='right' content='Delete' color="red" />  
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    )}
            </Item.Group>
        </Segment>
    )
}