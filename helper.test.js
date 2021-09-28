
const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');
    expect(format_date(date)).toBe('3/20/2020');
});

const {format_plural} =  require('../utils/helpers');

test('format_plural() returns a pluralized word', () => {
    expect(format_plural("comment",2)).toBe("comments");

    expect(format_plural("comment",1)).toBe("comment");
});

const {format_deburr} = require('../utils/helpers');

test ('format_deburr() return deburred string',() =>{
    expect(format_deburr("déjà")).toBe("deja");
});

const {format_isEmpty} = require('../utils/helpers');

test (' format_isEmpty() return boolean results',() =>{
    expect(format_isEmpty(null)).toBeTruthy();
    expect(format_isEmpty([1,2,3])).toBeFalsy();

});
