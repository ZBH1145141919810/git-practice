const courseList = [
    {name:"高等数学",score:85,credit:4},
    {name:"大学英语",score:78,credit:3},
    {name:"Python程序设计",score:92,credit:3}
];

console.log("====绩点计算器====");
console.log("课程数据：",courseList);

const valid = courseList.filter(item=>{
    return typeof item.score === "number" && item.score>=0 && item.score<=100;
});

const list = valid.map(c=>{
    let g;
    if(c.score>=90) g=4.0;
    else if(c.score>=80) g=3.0;
    else if(c.score>=70) g=2.0;
    else if(c.score>=60) g=1.0;
    else g=0;
    return {gp:g*c.credit,cr:c.credit};
});

const res = list.reduce((a,b)=>{
    a.sumGp += b.gp;
    a.sumCr += b.cr;
    return a;
},{sumGp:0,sumCr:0});

const gpa = res.sumCr===0 ? 0 : (res.sumGp/res.sumCr).toFixed(2);
console.log("加权绩点：",gpa);

