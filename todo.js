let todos_container = document.getElementById("todos_container");
let add_input = document.getElementById("main_input")
let new_input_item = document.getElementById("first_input")
let save = document.getElementById("saved")

function getting_Data() {
    let data = JSON.parse(localStorage.getItem("storedone"))
    if (data === null) {
        return [];

    } else {
        return data
    }
}
let todos_list = getting_Data();

save.onclick = function() {
    localStorage.setItem("storedone", JSON.stringify(todos_list))
}

function ontodo_change(checkbox_id, label_id, list_no) {

    let element = document.getElementById(checkbox_id);
    let striking = document.getElementById(label_id);
    striking.classList.toggle("checked");
    let element_id = todos_list.findIndex(function(every) {
        let searching_id = "list" + every.unique_no;
        if (searching_id === list_no) {
            return true;
        } else {
            return false;
        }
    });
    let final = todos_list[element_id];
    if (final.ischecked === true) {
        final.ischecked = false;
    } else {
        final.ischecked = true;

    }

}

function appending(each) {
    let checkbox_id = "checkbox" + each.unique_no
    let label_id = "label" + each.unique_no
    let list_no = "list" + each.unique_no
    let element = document.createElement("li")
    element.classList.add("d-flex", "flex-row", "todo_item_list")
    todos_container.appendChild(element)
    let input_element = document.createElement("input");
    input_element.id = checkbox_id;
    input_element.type = "checkbox";
    element.appendChild(input_element);
    let label_container = document.createElement("div");
    label_container.classList.add("label_container", "d-flex", "flex-row");
    element.appendChild(label_container);
    let label_element = document.createElement("label");
    label_element.id = label_id;
    label_element.htmlFor = checkbox_id;
    label_element.textContent = each.text;
    input_element.onclick = function() {
        ontodo_change(checkbox_id, label_id, list_no);
    };
    input_element.checked = each.ischecked
    if (each.ischecked === true) {
        label_element.classList.add("checked");
    }
    label_container.appendChild(label_element);
    let delete_container = document.createElement("div");
    delete_container.classList.add("delete_icon");
    label_container.appendChild(delete_container);
    let delete_item = document.createElement("i");
    delete_container.appendChild(delete_item);
    delete_item.classList.add("fa-solid", "fa-trash");
    delete_item.onclick = function() {
        todos_container.removeChild(element);
        let item = todos_list.findIndex(function(element) {
            let new_one = "list" + element.list_no;
            if (list_no === new_one) {
                console.log(element.list_no);
                return true;
            } else {
                return false;
            }
        });
        todos_list.splice(item, 1);
    };
}

function create_new() {
    let length_item = todos_list.length;
    if (new_input_item.value === "") {
        alert("enter something");
        return;
    }
    let new_item = {
        text: new_input_item.value,
        unique_no: length_item + 1,
        ischecked: false
    };
    console.log(new_item);
    todos_list.push((new_item));



    appending(new_item);
    new_input_item.value = "";
}
add_input.onclick = function() {
    create_new();
}
for (let each of todos_list) {
    appending(each)
}
