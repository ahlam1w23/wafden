// تسجيل الدخول باستخدام fetch للتعامل مع Firestore API مباشرة
function login() {
    const email = document.getElementById('Email').value;
    const password = document.getElementById('paswword').value;
    
    // استعلام للبحث عن المستخدم في Firestore
    fetch(`https://firestore.googleapis.com/v1/projects/wfdenmohamed/databases/(default)/documents/users?where=email%3D%27${email}%27`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.documents) {
            const user = data.documents.find(doc => doc.fields.paswword.stringValue === password);
            if (user && user.fields.role.stringValue === 'ADMIN') {
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
            } else {
                alert('ليس لديك صلاحيات الدخول');
            }
        } else {
            alert('خطأ في تسجيل الدخول: البريد الإلكتروني غير صحيح');
        }
    })
    .catch(error => {
        alert('حدث خطأ: ' + error.message);
    });
}

// إنشاء حساب جديد في Firestore
function register() {
    const email = document.getElementById('Email').value;
    const password = document.getElementById('paswword').value;
    
    if (!email || !password) {
        alert('يرجى إدخال البريد الإلكتروني وكلمة المرور');
        return;
    }
    
    const userData = {
        fields: {
            email: { stringValue: email },
            paswword: { stringValue: password },
            role: { stringValue: 'USER' } // الدور الافتراضي
        }
    };
    
    fetch('https://firestore.googleapis.com/v1/projects/wfdenmohamed/databases/(default)/documents/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert('تم إنشاء الحساب بنجاح');
    })
    .catch(error => {
        alert('حدث خطأ: ' + error.message);
    });
}
