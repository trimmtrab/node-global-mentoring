type ResMock = {
  end: jest.MockedFunction<any>,
  send: jest.MockedFunction<any>,
  sendStatus: jest.MockedFunction<any>,
  status: jest.MockedFunction<any>
};

export const createResMock = () => {
    const res = {} as ResMock;

    res.end = jest.fn();
    res.send = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn();
    res.status = jest.fn().mockReturnValue(res);

    return res;
};


export const expectSentStatus = (res: ResMock, status: number) => {
    try {
        expect(res.sendStatus).toBeCalledWith(status);
    } catch (e) {
        expect(res.status).toHaveBeenLastCalledWith(status);
        expect(res.end).toBeCalled();
    }
};
