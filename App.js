import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Platform,
  Keyboard,
  Switch,
  Button,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [taskItems, setTaskItems] = useState([]);
  const [error, setError] = useState("");
  const [isEnditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tempState, setTempState] = useState("");

  React.useEffect(() => {
    const componentWillMount = () => {};
    componentWillMount();
  }, []);

  const handleAddTask = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty!");
      return;
    }

    if (isEnditing) {
      const updatedTasks = [...taskItems];
      updatedTasks[editIndex] = { task, isImportant };
      setTaskItems(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      taskItems.push({ task, isImportant });
      setTaskItems(taskItems);
    }

    setTask("");
    setIsImportant(false);
  };

  const completeTask = (index) => {
    taskItems.splice(index, 1);
    setTaskItems(taskItems);
  };

  const editTask = (index) => {
    setTask(taskItems[index].task);
    setIsImportant(taskItems[index].isImportant);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <View key={index} style={styles.taskItem}>
              <Pressable onPress={() => completeTask(index)}>
                <Task text={item.task} isImportant={item.isImportant} />
              </Pressable>
              <Pressable onPress={() => editTask(index)}>
                <Text style={styles.editText}>Edit</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <View style={styles.switchWrapper}>
          <Text>Important: </Text>
          <Switch
            value={isImportant}
            onValueChange={() => setIsImportant(!isImportant)}
          />
        </View>
        <Pressable onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{isEnditing ? "Update" : "+"}</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>

      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: { paddingTop: 80, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: { marginTop: 30 },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 200,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  addText: {
    fontSize: 24,
  },
});
