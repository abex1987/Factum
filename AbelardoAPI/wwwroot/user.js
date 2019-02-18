const uri = "api/users";

function getCount(data) {
    const el = $("#counter");
    let name = "user";
    if (data) {
        if (data > 1) {
            name = "users";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getUsers();
});

function getUsers() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#users");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.name))
                    .append($("<td></td>").text(item.username))
                    .append($("<td></td>").text(item.email))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editUser(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteUser(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });
        }
    });
}

function addUser() {
    const user = {
        name: $("#add-name").val(),
        username: $("#add-username").val(),
        email: $("#add-email").val()
    };

    
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(user),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocurrio un error!");
        },
        success: function (result) {
            getUsers();
            $("#add-name").val("");
            $("#add-username").val("");
            $("#add-email").val("");
        }
    });
}

function deleteUser(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getUsers();
        }
    });
}

function editUser(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "GET",
        success: function (data) {
            $("#edit-name").val(data.name);
            $("#edit-username").val(data.username);
            $("#edit-email").val(data.email);
            $("#edit-id").val(data.id);
        }
    });

    $("#div-principal").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const user = {
        name: $("#edit-name").val(),
        username: $("#edit-username").val(),
        email: $("#edit-email").val(),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (result) {
            getUsers();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#div-principal").css({ display: "none" });
}