function Student(id,name,type,math,schemitry,physical,training){
    this.id = id;
    this.name = name;
    this.type = type;
    this.math = math;
    this.schemitry = schemitry;
    this.physical = physical;
    this.training = training;

    this.CalcAverage = function (){
        return ( this.math + this.schemitry + this.physical)/3;
    }
}

