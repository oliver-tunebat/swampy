// allows dates in objects to be serialized by next js
export default function makeSerializable<ObjectType>(object: ObjectType) {
    return JSON.parse(JSON.stringify(object)) as ObjectType;
}