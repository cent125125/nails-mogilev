(function () {
    fetch("/images")
        .then(res => {
            return res.json();
        })
        .then(images => {
            document.getElementById("image-galery").innerHTML = images
                .map(
                    i => `
        <div class="item">
          <div
            class="image"
            style="background-image: url('${i.url}')"
          ><div class="popover">${i.name}</div></div>
        </div>`
                )
                .join("");
        });
    const from = document.forms[0];
    const currentDate = new Date();
    form["date"].min = `${currentDate.getFullYear()}-${currentDate.getMonth() +
        1}-${currentDate.getDate()}`;
    form["date"].value = `${currentDate.getFullYear()}-${currentDate.getMonth() +
        1}-${currentDate.getDate() + 1}`;

    from.addEventListener(
        "submit",
        event => {
            event.preventDefault
                ? event.preventDefault()
                : (event.returnValue = false);
            fetch("/booking", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form["name"].value,
                    tel: form["tel"].value,
                    date: form["date"].value,
                    time: form["time"].value,
                    comment: form["comment"].value,
                    know: form["know"].value
                })
            }).then(() => {
                form["name"].value = form["name"].defaultValue;
                form["tel"].value = form["tel"].defaultValue;
                form["date"].value = form["date"].defaultValue;
                form["time"].value = form["time"].options[0].value;
                form["comment"].value = form["comment"].defaultValue;
                form["know"].value = form["know"].options[0].value;
                alert("<Спасибо за заявку! Мастер позвонит Вам в течении часа!>");
            });
            return false;
        },
        false
    );
})();