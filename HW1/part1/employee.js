function employee() {
    this.salary = 50000;
};

employee.prototype = {
    constructor : employee,
    getSalary : function() {
        return this.salary;
    }
};

function manager() {
};
manager.prototype = new employee();
manager.prototype.getSalary = function() {
    return this.salary + (this.salary * 0.50);
};

var employeeModule = (function() {
    var salary = 50000;
    return {
        getSalary : function() {
            return salary;
        },
        setSalary : function(value) {
            salary = value;
        }
    };
})(); 