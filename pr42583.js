//21.03.07: 프로그래머스 level.2 - [스택/큐] 다리를 지나는 트럭
//링크: https://programmers.co.kr/learn/courses/30/lessons/42583?language=javascript

//첫번째 시도
/*
count = 'weight >= 연속으로 있는 트럭 2대의 합' 인 경우의 수
savedTime = count * (bridge_length - 1)
origSolution = truck_weight.length(트럭 수) * bridge_length
solution = origSolution - savedTime
결과: 테스트 케이스를 부분적으로만 통과. 3개이상의 트럭이 동시에 다리에 올라오는 경우는 통과가 안됌.
*/
function solution(bridge_length, weight, truck_weights) {
    let count = 0;
    truck_weights.forEach((el, i) => {
        if (el + truck_weights[i + 1] <= weight) {
           count++;
        }
    })
    const savedTime = count * (bridge_length - 1);
    const origSolution = truck_weights.length * bridge_length + 1;
    return origSolution - savedTime;
}

//블로그 참고: https://jun-choi-4928.medium.com/programmers-level2-%EB%8B%A4%EB%A6%AC%EB%A5%BC-%EC%A7%80%EB%82%98%EB%8A%94-%ED%8A%B8%EB%9F%AD-ec5d33a46df
function solution(bridge_length, weight, truck_weights) {
    let waitingTrucks = truck_weights.length; //다리 지나기 전 트럭개수
    let crossedTrucks = 0; //다리를 지난 트럭개수

    //진입한 순간에 1초 감소가 무슨 말..?
    let second = 1;
    let onBridge = [
        {
            truckWeight: truck_weights.shift(),
            times: bridge_length - 1
        }
    ]

    //다리를 지나기 전 트럭 수와 다리를 지난 트럭 수가 같을 때까지 반복문 실행
    while (waitingTrucks !== crossedTrucks) {
        //다리 맨 앞에 있는 트럭의 시간이 모두 흘렀을 때
        if (onBridge[0].times === 0) {
            crossedTrucks++;
            onBridge.shift();
        }

        //1초씩 증가할 때 일어나야 하는 일
        second++;
        let currentWeight = 0;
        onBridge = onBridge.map((truck) => {
            const { truckWeight, times } = truck;
            currentWeight = currentWeight + truckWeight;
            return {...truck, times: times - 1} //모든 트럭의 걸리는 시간을 1초씩 감소한다?
        })
        console.log("onBridge", onBridge);

        if(currentWeight + truck_weights[0] <= weight) {
            const truck = { truckWeight: truck_weights.shift(), times: bridge_length - 1 };
            onBridge.push(truck);
        }

    }

    return second;
}
