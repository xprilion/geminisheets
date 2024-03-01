import fs from 'fs';
import path from 'path';


export const loadFromTemplate = (templateName: string, context: any, functionData: any = undefined) => {
    const filePath = path.join(process.cwd(), 'templates', templateName+".txt");
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let modifiedContents = fileContents;

    Object.keys(context).forEach(key => {
        const placeholder = `%${key}%`;
        modifiedContents = modifiedContents.replace(new RegExp(placeholder, 'g'), context[key]);
    });

    if(functionData){
        let prompt = functionData.prompt;

        if(functionData.inputs){
            const args = functionData.inputs.map((input: any) => input.name).join(', ');
            const params = functionData.inputs.map((input: any) => ` * @param {${input.type}} ${input.name} ${input.description}`).join('\n');
          
            modifiedContents = modifiedContents.replace('%ARGS%', args);
            modifiedContents = modifiedContents.replace('%PARAMS%', params);
            
            functionData.inputs.forEach((input: any) => {
                prompt = prompt.replace(`[${input.name}]`, `" + ${input.name} + "`);
            });
        }else{
            modifiedContents = modifiedContents.replace('%ARGS%', "");
            modifiedContents = modifiedContents.replace('%PARAMS%', "");
        }

        prompt = `return callApi("${prompt}")`;
    
        modifiedContents = modifiedContents.replace('return callApi("%PROMPT%")', prompt);
    }
  
    return modifiedContents;
  }
  