const localStorageEffect = key => ({ setSelf, onSet }) => {
  // 로컬 스토리지에서 상태 로드
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
    try {
      // 유효한 JSON인지 확인
        const parsedValue = JSON.parse(savedValue);
        setSelf(parsedValue);
    } catch (e) {
      // JSON.parse 실패 시 예외 처리
        console.error('Failed to parse JSON from localStorage', e);
    }
    }

  // 상태가 변경될 때 로컬 스토리지에 저장
    onSet(newValue => {
        if(newValue !== undefined) {
            localStorage.setItem(key, JSON.stringify(newValue));
        } else {
            localStorage.removeItem(key);
        }
    });
};

export default localStorageEffect;