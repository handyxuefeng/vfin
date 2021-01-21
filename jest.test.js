test('test common matcher', () => {
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5)
});

test('测试布尔类型', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();

})

test('测试数字', () => {
    expect(4).toBeGreaterThan(3);
    expect(2).toBeLessThan(3);
});

test('测试对象', () => {
    expect({ name: "component" }).toEqual({ name: "component" })
});


