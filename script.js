$(document).ready(function(){
    $('.dropdown-toggle').click(function(e) {
        // e.stopPropagation();
        $('.dropdown-menu').toggle();
        $('.dropdown-menu').addClass("active");
    });

    $(document).click(function(e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown-menu').hide();
            $('.dropdown-menu').removeClass("active");
        }
    });
    $.ajax({
        url: 'php/countFile.php', // Đường dẫn đến tệp PHP của bạn
        method: 'GET',
        success: function(data) {
            // Dữ liệu trả về từ tệp PHP sẽ là số lượng file
            // Cập nhật nội dung của phần tử .upload với số lượng file
            $('.upload').html(data + '<span>Đã tải lên</span>');
        }
    });
});

var dropdownItems = document.querySelectorAll('.dropdown-item');

// Duyệt qua từng mục
for (var i = 0; i < dropdownItems.length; i++) {
    // Thêm sự kiện click cho mỗi mục
    dropdownItems[i].addEventListener('click', function(e) {
        // Ngăn chặn hành vi mặc định của thẻ a
        e.preventDefault();

        // Lấy giá trị ngôn ngữ từ nội dung text của mục
        var language = this.textContent.trim();

        // Lưu giá trị ngôn ngữ vào localStorage
        localStorage.setItem('language', language);

        // Tải lại trang
        location.reload();
    });
}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/index.php', true);
    xhr.onload = function() {
        if (this.status == 200) {
            var fileCount = this.responseText;
            document.querySelector('.upload').innerHTML = fileCount + '<span>Đã tải lên</span>';
        }
    };
    xhr.send();

    var username = localStorage.getItem('username');
    // Hiển thị tên đăng nhập
    if (username) {
        document.querySelector('.username-display').textContent = username;
    }
};