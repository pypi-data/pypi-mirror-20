#include "GLMethods.hpp"

#include <cstdio>
#include <cstdlib>

/*

# TODO: remove this

methods = sorted(set([
	'ActiveTexture',
	'AttachShader',
	'BindBuffer',
	'BindFramebuffer',
	'BindTexture',
	'BindVertexArray',
	'BufferData',
	'BufferSubData',
	'Clear',
	'ClearColor',
	'CompileShader',
	'CopyBufferSubData',
	'CreateProgram',
	'CreateShader',
	'DeleteBuffers',
	'DeleteProgram',
	'DeleteShader',
	'DeleteTextures',
	'DeleteVertexArrays',
	'DrawArraysInstanced',
	'DrawElementsInstanced',
	'EnableVertexAttribArray',
	'Finish',
	'FramebufferTexture2D',
	'GenBuffers',
	'GenFramebuffers',
	'GenTextures',
	'GenVertexArrays',
	'GetAttribLocation',
	'GetProgramInfoLog',
	'GetProgramiv',
	'GetShaderInfoLog',
	'GetShaderiv',
	'GetString',
	'LineWidth',
	'LinkProgram',
	'MapBufferRange',
	'PointSize',
	'ShaderSource',
	'TexImage2D',
	'TexParameteri',
	'UnmapBuffer',
	'UseProgram',
	'VertexAttribDivisor',
	'VertexAttribIPointer',
	'VertexAttribPointer',
	'Viewport',
	'ActiveShaderProgram',
	'ActiveTexture',
	'AttachShader',
	'BeginConditionalRender',
	'BeginQuery',
	'BeginQueryIndexed',
	'BeginTransformFeedback',
	'BindAttribLocation',
	'BindBuffer',
	'BindBufferBase',
	'BindBufferRange',
	'BindBuffersBase',
	'BindBuffersRange',
	'BindFragDataLocation',
	'BindFragDataLocationIndexed',
	'BindFramebuffer',
	'BindImageTexture',
	'BindImageTextures',
	'BindProgramPipeline',
	'BindRenderbuffer',
	'BindSampler',
	'BindSamplers',
	'BindTexture',
	'BindTextures',
	'BindTextureUnit',
	'BindTransformFeedback',
	'BindVertexArray',
	'BindVertexBuffer',
	'BindVertexBuffers',
	'BlendColor',
	'BlendEquation',
	'BlendEquationi',
	'BlendEquationSeparate',
	'BlendEquationSeparatei',
	'BlendFunc',
	'BlendFunci',
	'BlendFuncSeparate',
	'BlendFuncSeparatei',
	'BlitFramebuffer',
	'BlitNamedFramebuffer',
	'BufferData',
	'BufferStorage',
	'BufferSubData',
	'CheckFramebufferStatus',
	'CheckNamedFramebufferStatus',
	'ClampColor',
	'Clear',
	'ClearBufferData',
	'ClearBufferfi',
	'ClearBufferfv',
	'ClearBufferiv',
	'ClearBufferSubData',
	'ClearBufferuiv',
	'ClearColor',
	'ClearDepth',
	'ClearDepthf',
	'ClearNamedBufferData',
	'ClearNamedBufferSubData',
	'ClearNamedFramebufferfi',
	'ClearNamedFramebufferfv',
	'ClearNamedFramebufferiv',
	'ClearNamedFramebufferuiv',
	'ClearStencil',
	'ClearTexImage',
	'ClearTexSubImage',
	'ClientWaitSync',
	'ClipControl',
	'ColorMask',
	'ColorMaski',
	'CompileShader',
	'CompressedTexImage1D',
	'CompressedTexImage2D',
	'CompressedTexImage3D',
	'CompressedTexSubImage1D',
	'CompressedTexSubImage2D',
	'CompressedTexSubImage3D',
	'CompressedTextureSubImage1D',
	'CompressedTextureSubImage2D',
	'CompressedTextureSubImage3D',
	'CopyBufferSubData',
	'CopyImageSubData',
	'CopyNamedBufferSubData',
	'CopyTexImage1D',
	'CopyTexImage2D',
	'CopyTexSubImage1D',
	'CopyTexSubImage2D',
	'CopyTexSubImage3D',
	'CopyTextureSubImage1D',
	'CopyTextureSubImage2D',
	'CopyTextureSubImage3D',
	'CreateBuffers',
	'CreateFramebuffers',
	'CreateProgram',
	'CreateProgramPipelines',
	'CreateQueries',
	'CreateRenderbuffers',
	'CreateSamplers',
	'CreateShader',
	'CreateShaderProgramv',
	'CreateTextures',
	'CreateTransformFeedbacks',
	'CreateVertexArrays',
	'CullFace',
	'DebugMessageCallback',
	'DebugMessageControl',
	'DebugMessageInsert',
	'DeleteBuffers',
	'DeleteFramebuffers',
	'DeleteProgram',
	'DeleteProgramPipelines',
	'DeleteQueries',
	'DeleteRenderbuffers',
	'DeleteSamplers',
	'DeleteShader',
	'DeleteSync',
	'DeleteTextures',
	'DeleteTransformFeedbacks',
	'DeleteVertexArrays',
	'DepthFunc',
	'DepthMask',
	'DepthRange',
	'DepthRangeArrayv',
	'DepthRangef',
	'DepthRangeIndexed',
	'DetachShader',
	'Disable',
	'Disablei',
	'DisableVertexArrayAttrib',
	'DisableVertexAttribArray',
	'DispatchCompute',
	'DispatchComputeIndirect',
	'DrawArrays',
	'DrawArraysIndirect',
	'DrawArraysInstanced',
	'DrawArraysInstancedBaseInstance',
	'DrawBuffer',
	'DrawBuffers',
	'DrawElements',
	'DrawElementsBaseVertex',
	'DrawElementsIndirect',
	'DrawElementsInstanced',
	'DrawElementsInstancedBaseInstance',
	'DrawElementsInstancedBaseVertex',
	'DrawElementsInstancedBaseVertexBaseInstance',
	'DrawRangeElements',
	'DrawRangeElementsBaseVertex',
	'DrawTransformFeedback',
	'DrawTransformFeedbackInstanced',
	'DrawTransformFeedbackStream',
	'DrawTransformFeedbackStreamInstanced',
	'Enable',
	'Enablei',
	'EnableVertexArrayAttrib',
	'EnableVertexAttribArray',
	'EndConditionalRender',
	'EndQuery',
	'EndQueryIndexed',
	'EndTransformFeedback',
	'FenceSync',
	'Finish',
	'Flush',
	'FlushMappedBufferRange',
	'FlushMappedNamedBufferRange',
	'FramebufferParameteri',
	'FramebufferRenderbuffer',
	'FramebufferTexture',
	'FramebufferTexture1D',
	'FramebufferTexture2D',
	'FramebufferTexture3D',
	'FramebufferTextureLayer',
	'FrontFace',
	'GenBuffers',
	'GenerateMipmap',
	'GenerateTextureMipmap',
	'GenFramebuffers',
	'GenProgramPipelines',
	'GenQueries',
	'GenRenderbuffers',
	'GenSamplers',
	'GenTextures',
	'GenTransformFeedbacks',
	'GenVertexArrays',
	'GetActiveAtomicCounterBufferiv',
	'GetActiveAttrib',
	'GetActiveSubroutineName',
	'GetActiveSubroutineUniformiv',
	'GetActiveSubroutineUniformName',
	'GetActiveUniform',
	'GetActiveUniformBlockiv',
	'GetActiveUniformBlockName',
	'GetActiveUniformName',
	'GetActiveUniformsiv',
	'GetAttachedShaders',
	'GetAttribLocation',
	'GetBooleani_v',
	'GetBooleanv',
	'GetBufferParameteri64v',
	'GetBufferParameteriv',
	'GetBufferPointerv',
	'GetBufferSubData',
	'GetCompressedTexImage',
	'GetCompressedTextureImage',
	'GetCompressedTextureSubImage',
	'GetDebugMessageLog',
	'GetDoublei_v',
	'GetDoublev',
	'GetError',
	'GetFloati_v',
	'GetFloatv',
	'GetFragDataIndex',
	'GetFragDataLocation',
	'GetFramebufferAttachmentParameteriv',
	'GetFramebufferParameteriv',
	'GetGraphicsResetStatus',
	'GetInteger64i_v',
	'GetInteger64v',
	'GetIntegeri_v',
	'GetIntegerv',
	'GetInternalformati64v',
	'GetInternalformativ',
	'GetMultisamplefv',
	'GetNamedBufferParameteri64v',
	'GetNamedBufferParameteriv',
	'GetNamedBufferPointerv',
	'GetNamedBufferSubData',
	'GetNamedFramebufferAttachmentParameteriv',
	'GetNamedFramebufferParameteriv',
	'GetNamedRenderbufferParameteriv',
	'GetnCompressedTexImage',
	'GetnTexImage',
	'GetnUniformdv',
	'GetnUniformfv',
	'GetnUniformiv',
	'GetnUniformuiv',
	'GetObjectLabel',
	'GetObjectPtrLabel',
	'GetPointerv',
	'GetProgramBinary',
	'GetProgramInfoLog',
	'GetProgramInterfaceiv',
	'GetProgramiv',
	'GetProgramPipelineInfoLog',
	'GetProgramPipelineiv',
	'GetProgramResourceIndex',
	'GetProgramResourceiv',
	'GetProgramResourceLocation',
	'GetProgramResourceLocationIndex',
	'GetProgramResourceName',
	'GetProgramStageiv',
	'GetQueryBufferObjecti64v',
	'GetQueryBufferObjectiv',
	'GetQueryBufferObjectui64v',
	'GetQueryBufferObjectuiv',
	'GetQueryIndexediv',
	'GetQueryiv',
	'GetQueryObjecti64v',
	'GetQueryObjectiv',
	'GetQueryObjectui64v',
	'GetQueryObjectuiv',
	'GetRenderbufferParameteriv',
	'GetSamplerParameterfv',
	'GetSamplerParameterIiv',
	'GetSamplerParameterIuiv',
	'GetSamplerParameteriv',
	'GetShaderInfoLog',
	'GetShaderiv',
	'GetShaderPrecisionFormat',
	'GetShaderSource',
	'GetString',
	'GetStringi',
	'GetSubroutineIndex',
	'GetSubroutineUniformLocation',
	'GetSynciv',
	'GetTexImage',
	'GetTexLevelParameterfv',
	'GetTexLevelParameteriv',
	'GetTexParameterfv',
	'GetTexParameterIiv',
	'GetTexParameterIuiv',
	'GetTexParameteriv',
	'GetTextureImage',
	'GetTextureLevelParameterfv',
	'GetTextureLevelParameteriv',
	'GetTextureParameterfv',
	'GetTextureParameterIiv',
	'GetTextureParameterIuiv',
	'GetTextureParameteriv',
	'GetTextureSubImage',
	'GetTransformFeedbacki64_v',
	'GetTransformFeedbacki_v',
	'GetTransformFeedbackiv',
	'GetTransformFeedbackVarying',
	'GetUniformBlockIndex',
	'GetUniformdv',
	'GetUniformfv',
	'GetUniformIndices',
	'GetUniformiv',
	'GetUniformLocation',
	'GetUniformSubroutineuiv',
	'GetUniformuiv',
	'GetVertexArrayIndexed64iv',
	'GetVertexArrayIndexediv',
	'GetVertexArrayiv',
	'GetVertexAttribdv',
	'GetVertexAttribfv',
	'GetVertexAttribIiv',
	'GetVertexAttribIuiv',
	'GetVertexAttribiv',
	'GetVertexAttribLdv',
	'GetVertexAttribPointerv',
	'Hint',
	'InvalidateBufferData',
	'InvalidateBufferSubData',
	'InvalidateFramebuffer',
	'InvalidateNamedFramebufferData',
	'InvalidateNamedFramebufferSubData',
	'InvalidateSubFramebuffer',
	'InvalidateTexImage',
	'InvalidateTexSubImage',
	'IsBuffer',
	'IsEnabled',
	'IsEnabledi',
	'IsFramebuffer',
	'IsProgram',
	'IsProgramPipeline',
	'IsQuery',
	'IsRenderbuffer',
	'IsSampler',
	'IsShader',
	'IsSync',
	'IsTexture',
	'IsTransformFeedback',
	'IsVertexArray',
	'LineWidth',
	'LinkProgram',
	'LogicOp',
	'MapBuffer',
	'MapBufferRange',
	'MapNamedBuffer',
	'MapNamedBufferRange',
	'MemoryBarrier',
	'MemoryBarrierByRegion',
	'MinSampleShading',
	'MultiDrawArrays',
	'MultiDrawArraysIndirect',
	'MultiDrawElements',
	'MultiDrawElementsBaseVertex',
	'MultiDrawElementsIndirect',
	'NamedBufferData',
	'NamedBufferStorage',
	'NamedBufferSubData',
	'NamedFramebufferDrawBuffer',
	'NamedFramebufferDrawBuffers',
	'NamedFramebufferParameteri',
	'NamedFramebufferReadBuffer',
	'NamedFramebufferRenderbuffer',
	'NamedFramebufferTexture',
	'NamedFramebufferTextureLayer',
	'NamedRenderbufferStorage',
	'NamedRenderbufferStorageMultisample',
	'ObjectLabel',
	'ObjectPtrLabel',
	'PatchParameterfv',
	'PatchParameteri',
	'PauseTransformFeedback',
	'PixelStoref',
	'PixelStorei',
	'PointParameterf',
	'PointParameterfv',
	'PointParameteri',
	'PointParameteriv',
	'PointSize',
	'PolygonMode',
	'PolygonOffset',
	'PopDebugGroup',
	'PrimitiveRestartIndex',
	'ProgramBinary',
	'ProgramParameteri',
	'ProgramUniform1d',
	'ProgramUniform1dv',
	'ProgramUniform1f',
	'ProgramUniform1fv',
	'ProgramUniform1i',
	'ProgramUniform1iv',
	'ProgramUniform1ui',
	'ProgramUniform1uiv',
	'ProgramUniform2d',
	'ProgramUniform2dv',
	'ProgramUniform2f',
	'ProgramUniform2fv',
	'ProgramUniform2i',
	'ProgramUniform2iv',
	'ProgramUniform2ui',
	'ProgramUniform2uiv',
	'ProgramUniform3d',
	'ProgramUniform3dv',
	'ProgramUniform3f',
	'ProgramUniform3fv',
	'ProgramUniform3i',
	'ProgramUniform3iv',
	'ProgramUniform3ui',
	'ProgramUniform3uiv',
	'ProgramUniform4d',
	'ProgramUniform4dv',
	'ProgramUniform4f',
	'ProgramUniform4fv',
	'ProgramUniform4i',
	'ProgramUniform4iv',
	'ProgramUniform4ui',
	'ProgramUniform4uiv',
	'ProgramUniformMatrix2dv',
	'ProgramUniformMatrix2fv',
	'ProgramUniformMatrix2x3dv',
	'ProgramUniformMatrix2x3fv',
	'ProgramUniformMatrix2x4dv',
	'ProgramUniformMatrix2x4fv',
	'ProgramUniformMatrix3dv',
	'ProgramUniformMatrix3fv',
	'ProgramUniformMatrix3x2dv',
	'ProgramUniformMatrix3x2fv',
	'ProgramUniformMatrix3x4dv',
	'ProgramUniformMatrix3x4fv',
	'ProgramUniformMatrix4dv',
	'ProgramUniformMatrix4fv',
	'ProgramUniformMatrix4x2dv',
	'ProgramUniformMatrix4x2fv',
	'ProgramUniformMatrix4x3dv',
	'ProgramUniformMatrix4x3fv',
	'ProvokingVertex',
	'PushDebugGroup',
	'QueryCounter',
	'ReadBuffer',
	'ReadnPixels',
	'ReadPixels',
	'ReleaseShaderCompiler',
	'RenderbufferStorage',
	'RenderbufferStorageMultisample',
	'ResumeTransformFeedback',
	'SampleCoverage',
	'SampleMaski',
	'SamplerParameterf',
	'SamplerParameterfv',
	'SamplerParameteri',
	'SamplerParameterIiv',
	'SamplerParameterIuiv',
	'SamplerParameteriv',
	'Scissor',
	'ScissorArrayv',
	'ScissorIndexed',
	'ScissorIndexedv',
	'ShaderBinary',
	'ShaderSource',
	'ShaderStorageBlockBinding',
	'StencilFunc',
	'StencilFuncSeparate',
	'StencilMask',
	'StencilMaskSeparate',
	'StencilOp',
	'StencilOpSeparate',
	'SwapInterval',
	'SwapIntervalEXT',
	'TexBuffer',
	'TexBufferRange',
	'TexImage1D',
	'TexImage2D',
	'TexImage2DMultisample',
	'TexImage3D',
	'TexImage3DMultisample',
	'TexParameterf',
	'TexParameterfv',
	'TexParameteri',
	'TexParameterIiv',
	'TexParameterIuiv',
	'TexParameteriv',
	'TexStorage1D',
	'TexStorage2D',
	'TexStorage2DMultisample',
	'TexStorage3D',
	'TexStorage3DMultisample',
	'TexSubImage1D',
	'TexSubImage2D',
	'TexSubImage3D',
	'TextureBarrier',
	'TextureBuffer',
	'TextureBufferRange',
	'TextureParameterf',
	'TextureParameterfv',
	'TextureParameteri',
	'TextureParameterIiv',
	'TextureParameterIuiv',
	'TextureParameteriv',
	'TextureStorage1D',
	'TextureStorage2D',
	'TextureStorage2DMultisample',
	'TextureStorage3D',
	'TextureStorage3DMultisample',
	'TextureSubImage1D',
	'TextureSubImage2D',
	'TextureSubImage3D',
	'TextureView',
	'TransformFeedbackBufferBase',
	'TransformFeedbackBufferRange',
	'TransformFeedbackVaryings',
	'Uniform1d',
	'Uniform1dv',
	'Uniform1f',
	'Uniform1fv',
	'Uniform1i',
	'Uniform1iv',
	'Uniform1ui',
	'Uniform1uiv',
	'Uniform2d',
	'Uniform2dv',
	'Uniform2f',
	'Uniform2fv',
	'Uniform2i',
	'Uniform2iv',
	'Uniform2ui',
	'Uniform2uiv',
	'Uniform3d',
	'Uniform3dv',
	'Uniform3f',
	'Uniform3fv',
	'Uniform3i',
	'Uniform3iv',
	'Uniform3ui',
	'Uniform3uiv',
	'Uniform4d',
	'Uniform4dv',
	'Uniform4f',
	'Uniform4fv',
	'Uniform4i',
	'Uniform4iv',
	'Uniform4ui',
	'Uniform4uiv',
	'UniformBlockBinding',
	'UniformMatrix2dv',
	'UniformMatrix2fv',
	'UniformMatrix2x3dv',
	'UniformMatrix2x3fv',
	'UniformMatrix2x4dv',
	'UniformMatrix2x4fv',
	'UniformMatrix3dv',
	'UniformMatrix3fv',
	'UniformMatrix3x2dv',
	'UniformMatrix3x2fv',
	'UniformMatrix3x4dv',
	'UniformMatrix3x4fv',
	'UniformMatrix4dv',
	'UniformMatrix4fv',
	'UniformMatrix4x2dv',
	'UniformMatrix4x2fv',
	'UniformMatrix4x3dv',
	'UniformMatrix4x3fv',
	'UniformSubroutinesuiv',
	'UnmapBuffer',
	'UnmapNamedBuffer',
	'UseProgram',
	'UseProgramStages',
	'ValidateProgram',
	'ValidateProgramPipeline',
	'VertexArrayAttribBinding',
	'VertexArrayAttribFormat',
	'VertexArrayAttribIFormat',
	'VertexArrayAttribLFormat',
	'VertexArrayBindingDivisor',
	'VertexArrayElementBuffer',
	'VertexArrayVertexBuffer',
	'VertexArrayVertexBuffers',
	'VertexAttrib1d',
	'VertexAttrib1dv',
	'VertexAttrib1f',
	'VertexAttrib1fv',
	'VertexAttrib1s',
	'VertexAttrib1sv',
	'VertexAttrib2d',
	'VertexAttrib2dv',
	'VertexAttrib2f',
	'VertexAttrib2fv',
	'VertexAttrib2s',
	'VertexAttrib2sv',
	'VertexAttrib3d',
	'VertexAttrib3dv',
	'VertexAttrib3f',
	'VertexAttrib3fv',
	'VertexAttrib3s',
	'VertexAttrib3sv',
	'VertexAttrib4bv',
	'VertexAttrib4d',
	'VertexAttrib4dv',
	'VertexAttrib4f',
	'VertexAttrib4fv',
	'VertexAttrib4iv',
	'VertexAttrib4Nbv',
	'VertexAttrib4Niv',
	'VertexAttrib4Nsv',
	'VertexAttrib4Nub',
	'VertexAttrib4Nubv',
	'VertexAttrib4Nuiv',
	'VertexAttrib4Nusv',
	'VertexAttrib4s',
	'VertexAttrib4sv',
	'VertexAttrib4ubv',
	'VertexAttrib4uiv',
	'VertexAttrib4usv',
	'VertexAttribBinding',
	'VertexAttribDivisor',
	'VertexAttribFormat',
	'VertexAttribI1i',
	'VertexAttribI1iv',
	'VertexAttribI1ui',
	'VertexAttribI1uiv',
	'VertexAttribI2i',
	'VertexAttribI2iv',
	'VertexAttribI2ui',
	'VertexAttribI2uiv',
	'VertexAttribI3i',
	'VertexAttribI3iv',
	'VertexAttribI3ui',
	'VertexAttribI3uiv',
	'VertexAttribI4bv',
	'VertexAttribI4i',
	'VertexAttribI4iv',
	'VertexAttribI4sv',
	'VertexAttribI4ubv',
	'VertexAttribI4ui',
	'VertexAttribI4uiv',
	'VertexAttribI4usv',
	'VertexAttribIFormat',
	'VertexAttribIPointer',
	'VertexAttribL1d',
	'VertexAttribL1dv',
	'VertexAttribL2d',
	'VertexAttribL2dv',
	'VertexAttribL3d',
	'VertexAttribL3dv',
	'VertexAttribL4d',
	'VertexAttribL4dv',
	'VertexAttribLFormat',
	'VertexAttribLPointer',
	'VertexAttribP1ui',
	'VertexAttribP1uiv',
	'VertexAttribP2ui',
	'VertexAttribP2uiv',
	'VertexAttribP3ui',
	'VertexAttribP3uiv',
	'VertexAttribP4ui',
	'VertexAttribP4uiv',
	'VertexAttribPointer',
	'VertexBindingDivisor',
	'Viewport',
	'ViewportArrayv',
	'ViewportIndexedf',
	'ViewportIndexedfv',
]))

def find(method):
	return '%(name)s = (PROC_gl%(name)s)LoadMethod("gl%(name)s");' % {'name': method}

load = '\n\t'.join(find(method) for method in methods)

define = '\n\t'.join('PROC_gl%s %s;' % (method, method) for method in methods)

*/

// TODO: better

#define INVALID_METHOD(method) (!(method) || ((void *)(method) == (void *)dummy_method))

void GLAPI FakeGetProgramStageiv(GLuint program, GLenum shadertype, GLenum pname, GLint * values) {
	values[0] = 0;

	// switch (pname) {
	// 	case GL_ACTIVE_SUBROUTINES:
	// 	case GL_ACTIVE_SUBROUTINE_UNIFORMS:
	// 	case GL_ACTIVE_SUBROUTINE_UNIFORM_LOCATIONS:
	// 		values[0] = 0;
	// 		break;
	// }
}

void GLAPI dummy_method() {
	printf("DUMMY METHOD\n");
	exit(0);
}

#if defined(_WIN32) || defined(_WIN64)

#include <Windows.h>

void * LoadMethod(const char * method) {
	static HMODULE opengl32 = LoadLibrary("opengl32.dll");

	void * proc = (void *)GetProcAddress(opengl32, method);

	if (proc) {
		return proc;
	}

	proc = (void *)wglGetProcAddress(method);

	if (proc) {
		return proc;
	}

	// printf("%s NOT found!\n", method);
	return (void *)dummy_method;
}

#else

#include <dlfcn.h>
#include <X11/Xlib.h>
#include <X11/Xutil.h>

typedef const void * (* PROC_glXGetProcAddress)(const char *);

void * LoadMethod(const char * method) {
	static void * libgl = dlopen("libGL.so.1", RTLD_LAZY);
	static PROC_glXGetProcAddress glXGetProcAddress = (PROC_glXGetProcAddress)dlsym(libgl, "glXGetProcAddress");

	void * proc = (void *)dlsym(libgl, method);

	if (proc) {
		// printf("%s found!\n", method);
		return proc;
	}

	proc = (void *)glXGetProcAddress(method);

	if (proc) {
		// printf("%s found!\n", method);
		return proc;
	}

	// printf("%s NOT found!\n", method);
	return (void *)dummy_method;
}

#endif

void GLMethods::load() {
	ActiveShaderProgram = (PROC_glActiveShaderProgram)LoadMethod("glActiveShaderProgram");
	ActiveTexture = (PROC_glActiveTexture)LoadMethod("glActiveTexture");
	AttachShader = (PROC_glAttachShader)LoadMethod("glAttachShader");
	BeginConditionalRender = (PROC_glBeginConditionalRender)LoadMethod("glBeginConditionalRender");
	BeginQuery = (PROC_glBeginQuery)LoadMethod("glBeginQuery");
	BeginQueryIndexed = (PROC_glBeginQueryIndexed)LoadMethod("glBeginQueryIndexed");
	BeginTransformFeedback = (PROC_glBeginTransformFeedback)LoadMethod("glBeginTransformFeedback");
	BindAttribLocation = (PROC_glBindAttribLocation)LoadMethod("glBindAttribLocation");
	BindBuffer = (PROC_glBindBuffer)LoadMethod("glBindBuffer");
	BindBufferBase = (PROC_glBindBufferBase)LoadMethod("glBindBufferBase");
	BindBufferRange = (PROC_glBindBufferRange)LoadMethod("glBindBufferRange");
	BindBuffersBase = (PROC_glBindBuffersBase)LoadMethod("glBindBuffersBase");
	BindBuffersRange = (PROC_glBindBuffersRange)LoadMethod("glBindBuffersRange");
	BindFragDataLocation = (PROC_glBindFragDataLocation)LoadMethod("glBindFragDataLocation");
	BindFragDataLocationIndexed = (PROC_glBindFragDataLocationIndexed)LoadMethod("glBindFragDataLocationIndexed");
	BindFramebuffer = (PROC_glBindFramebuffer)LoadMethod("glBindFramebuffer");
	BindImageTexture = (PROC_glBindImageTexture)LoadMethod("glBindImageTexture");
	BindImageTextures = (PROC_glBindImageTextures)LoadMethod("glBindImageTextures");
	BindProgramPipeline = (PROC_glBindProgramPipeline)LoadMethod("glBindProgramPipeline");
	BindRenderbuffer = (PROC_glBindRenderbuffer)LoadMethod("glBindRenderbuffer");
	BindSampler = (PROC_glBindSampler)LoadMethod("glBindSampler");
	BindSamplers = (PROC_glBindSamplers)LoadMethod("glBindSamplers");
	BindTexture = (PROC_glBindTexture)LoadMethod("glBindTexture");
	BindTextureUnit = (PROC_glBindTextureUnit)LoadMethod("glBindTextureUnit");
	BindTextures = (PROC_glBindTextures)LoadMethod("glBindTextures");
	BindTransformFeedback = (PROC_glBindTransformFeedback)LoadMethod("glBindTransformFeedback");
	BindVertexArray = (PROC_glBindVertexArray)LoadMethod("glBindVertexArray");
	BindVertexBuffer = (PROC_glBindVertexBuffer)LoadMethod("glBindVertexBuffer");
	BindVertexBuffers = (PROC_glBindVertexBuffers)LoadMethod("glBindVertexBuffers");
	BlendColor = (PROC_glBlendColor)LoadMethod("glBlendColor");
	BlendEquation = (PROC_glBlendEquation)LoadMethod("glBlendEquation");
	BlendEquationSeparate = (PROC_glBlendEquationSeparate)LoadMethod("glBlendEquationSeparate");
	BlendEquationSeparatei = (PROC_glBlendEquationSeparatei)LoadMethod("glBlendEquationSeparatei");
	BlendEquationi = (PROC_glBlendEquationi)LoadMethod("glBlendEquationi");
	BlendFunc = (PROC_glBlendFunc)LoadMethod("glBlendFunc");
	BlendFuncSeparate = (PROC_glBlendFuncSeparate)LoadMethod("glBlendFuncSeparate");
	BlendFuncSeparatei = (PROC_glBlendFuncSeparatei)LoadMethod("glBlendFuncSeparatei");
	BlendFunci = (PROC_glBlendFunci)LoadMethod("glBlendFunci");
	BlitFramebuffer = (PROC_glBlitFramebuffer)LoadMethod("glBlitFramebuffer");
	BlitNamedFramebuffer = (PROC_glBlitNamedFramebuffer)LoadMethod("glBlitNamedFramebuffer");
	BufferData = (PROC_glBufferData)LoadMethod("glBufferData");
	BufferStorage = (PROC_glBufferStorage)LoadMethod("glBufferStorage");
	BufferSubData = (PROC_glBufferSubData)LoadMethod("glBufferSubData");
	CheckFramebufferStatus = (PROC_glCheckFramebufferStatus)LoadMethod("glCheckFramebufferStatus");
	CheckNamedFramebufferStatus = (PROC_glCheckNamedFramebufferStatus)LoadMethod("glCheckNamedFramebufferStatus");
	ClampColor = (PROC_glClampColor)LoadMethod("glClampColor");
	Clear = (PROC_glClear)LoadMethod("glClear");
	ClearBufferData = (PROC_glClearBufferData)LoadMethod("glClearBufferData");
	ClearBufferSubData = (PROC_glClearBufferSubData)LoadMethod("glClearBufferSubData");
	ClearBufferfi = (PROC_glClearBufferfi)LoadMethod("glClearBufferfi");
	ClearBufferfv = (PROC_glClearBufferfv)LoadMethod("glClearBufferfv");
	ClearBufferiv = (PROC_glClearBufferiv)LoadMethod("glClearBufferiv");
	ClearBufferuiv = (PROC_glClearBufferuiv)LoadMethod("glClearBufferuiv");
	ClearColor = (PROC_glClearColor)LoadMethod("glClearColor");
	ClearDepth = (PROC_glClearDepth)LoadMethod("glClearDepth");
	ClearDepthf = (PROC_glClearDepthf)LoadMethod("glClearDepthf");
	ClearNamedBufferData = (PROC_glClearNamedBufferData)LoadMethod("glClearNamedBufferData");
	ClearNamedBufferSubData = (PROC_glClearNamedBufferSubData)LoadMethod("glClearNamedBufferSubData");
	ClearNamedFramebufferfi = (PROC_glClearNamedFramebufferfi)LoadMethod("glClearNamedFramebufferfi");
	ClearNamedFramebufferfv = (PROC_glClearNamedFramebufferfv)LoadMethod("glClearNamedFramebufferfv");
	ClearNamedFramebufferiv = (PROC_glClearNamedFramebufferiv)LoadMethod("glClearNamedFramebufferiv");
	ClearNamedFramebufferuiv = (PROC_glClearNamedFramebufferuiv)LoadMethod("glClearNamedFramebufferuiv");
	ClearStencil = (PROC_glClearStencil)LoadMethod("glClearStencil");
	ClearTexImage = (PROC_glClearTexImage)LoadMethod("glClearTexImage");
	ClearTexSubImage = (PROC_glClearTexSubImage)LoadMethod("glClearTexSubImage");
	ClientWaitSync = (PROC_glClientWaitSync)LoadMethod("glClientWaitSync");
	ClipControl = (PROC_glClipControl)LoadMethod("glClipControl");
	ColorMask = (PROC_glColorMask)LoadMethod("glColorMask");
	ColorMaski = (PROC_glColorMaski)LoadMethod("glColorMaski");
	CompileShader = (PROC_glCompileShader)LoadMethod("glCompileShader");
	CompressedTexImage1D = (PROC_glCompressedTexImage1D)LoadMethod("glCompressedTexImage1D");
	CompressedTexImage2D = (PROC_glCompressedTexImage2D)LoadMethod("glCompressedTexImage2D");
	CompressedTexImage3D = (PROC_glCompressedTexImage3D)LoadMethod("glCompressedTexImage3D");
	CompressedTexSubImage1D = (PROC_glCompressedTexSubImage1D)LoadMethod("glCompressedTexSubImage1D");
	CompressedTexSubImage2D = (PROC_glCompressedTexSubImage2D)LoadMethod("glCompressedTexSubImage2D");
	CompressedTexSubImage3D = (PROC_glCompressedTexSubImage3D)LoadMethod("glCompressedTexSubImage3D");
	CompressedTextureSubImage1D = (PROC_glCompressedTextureSubImage1D)LoadMethod("glCompressedTextureSubImage1D");
	CompressedTextureSubImage2D = (PROC_glCompressedTextureSubImage2D)LoadMethod("glCompressedTextureSubImage2D");
	CompressedTextureSubImage3D = (PROC_glCompressedTextureSubImage3D)LoadMethod("glCompressedTextureSubImage3D");
	CopyBufferSubData = (PROC_glCopyBufferSubData)LoadMethod("glCopyBufferSubData");
	CopyImageSubData = (PROC_glCopyImageSubData)LoadMethod("glCopyImageSubData");
	CopyNamedBufferSubData = (PROC_glCopyNamedBufferSubData)LoadMethod("glCopyNamedBufferSubData");
	CopyTexImage1D = (PROC_glCopyTexImage1D)LoadMethod("glCopyTexImage1D");
	CopyTexImage2D = (PROC_glCopyTexImage2D)LoadMethod("glCopyTexImage2D");
	CopyTexSubImage1D = (PROC_glCopyTexSubImage1D)LoadMethod("glCopyTexSubImage1D");
	CopyTexSubImage2D = (PROC_glCopyTexSubImage2D)LoadMethod("glCopyTexSubImage2D");
	CopyTexSubImage3D = (PROC_glCopyTexSubImage3D)LoadMethod("glCopyTexSubImage3D");
	CopyTextureSubImage1D = (PROC_glCopyTextureSubImage1D)LoadMethod("glCopyTextureSubImage1D");
	CopyTextureSubImage2D = (PROC_glCopyTextureSubImage2D)LoadMethod("glCopyTextureSubImage2D");
	CopyTextureSubImage3D = (PROC_glCopyTextureSubImage3D)LoadMethod("glCopyTextureSubImage3D");
	CreateBuffers = (PROC_glCreateBuffers)LoadMethod("glCreateBuffers");
	CreateFramebuffers = (PROC_glCreateFramebuffers)LoadMethod("glCreateFramebuffers");
	CreateProgram = (PROC_glCreateProgram)LoadMethod("glCreateProgram");
	CreateProgramPipelines = (PROC_glCreateProgramPipelines)LoadMethod("glCreateProgramPipelines");
	CreateQueries = (PROC_glCreateQueries)LoadMethod("glCreateQueries");
	CreateRenderbuffers = (PROC_glCreateRenderbuffers)LoadMethod("glCreateRenderbuffers");
	CreateSamplers = (PROC_glCreateSamplers)LoadMethod("glCreateSamplers");
	CreateShader = (PROC_glCreateShader)LoadMethod("glCreateShader");
	CreateShaderProgramv = (PROC_glCreateShaderProgramv)LoadMethod("glCreateShaderProgramv");
	CreateTextures = (PROC_glCreateTextures)LoadMethod("glCreateTextures");
	CreateTransformFeedbacks = (PROC_glCreateTransformFeedbacks)LoadMethod("glCreateTransformFeedbacks");
	CreateVertexArrays = (PROC_glCreateVertexArrays)LoadMethod("glCreateVertexArrays");
	CullFace = (PROC_glCullFace)LoadMethod("glCullFace");
	DebugMessageCallback = (PROC_glDebugMessageCallback)LoadMethod("glDebugMessageCallback");
	DebugMessageControl = (PROC_glDebugMessageControl)LoadMethod("glDebugMessageControl");
	DebugMessageInsert = (PROC_glDebugMessageInsert)LoadMethod("glDebugMessageInsert");
	DeleteBuffers = (PROC_glDeleteBuffers)LoadMethod("glDeleteBuffers");
	DeleteFramebuffers = (PROC_glDeleteFramebuffers)LoadMethod("glDeleteFramebuffers");
	DeleteProgram = (PROC_glDeleteProgram)LoadMethod("glDeleteProgram");
	DeleteProgramPipelines = (PROC_glDeleteProgramPipelines)LoadMethod("glDeleteProgramPipelines");
	DeleteQueries = (PROC_glDeleteQueries)LoadMethod("glDeleteQueries");
	DeleteRenderbuffers = (PROC_glDeleteRenderbuffers)LoadMethod("glDeleteRenderbuffers");
	DeleteSamplers = (PROC_glDeleteSamplers)LoadMethod("glDeleteSamplers");
	DeleteShader = (PROC_glDeleteShader)LoadMethod("glDeleteShader");
	DeleteSync = (PROC_glDeleteSync)LoadMethod("glDeleteSync");
	DeleteTextures = (PROC_glDeleteTextures)LoadMethod("glDeleteTextures");
	DeleteTransformFeedbacks = (PROC_glDeleteTransformFeedbacks)LoadMethod("glDeleteTransformFeedbacks");
	DeleteVertexArrays = (PROC_glDeleteVertexArrays)LoadMethod("glDeleteVertexArrays");
	DepthFunc = (PROC_glDepthFunc)LoadMethod("glDepthFunc");
	DepthMask = (PROC_glDepthMask)LoadMethod("glDepthMask");
	DepthRange = (PROC_glDepthRange)LoadMethod("glDepthRange");
	DepthRangeArrayv = (PROC_glDepthRangeArrayv)LoadMethod("glDepthRangeArrayv");
	DepthRangeIndexed = (PROC_glDepthRangeIndexed)LoadMethod("glDepthRangeIndexed");
	DepthRangef = (PROC_glDepthRangef)LoadMethod("glDepthRangef");
	DetachShader = (PROC_glDetachShader)LoadMethod("glDetachShader");
	Disable = (PROC_glDisable)LoadMethod("glDisable");
	DisableVertexArrayAttrib = (PROC_glDisableVertexArrayAttrib)LoadMethod("glDisableVertexArrayAttrib");
	DisableVertexAttribArray = (PROC_glDisableVertexAttribArray)LoadMethod("glDisableVertexAttribArray");
	Disablei = (PROC_glDisablei)LoadMethod("glDisablei");
	DispatchCompute = (PROC_glDispatchCompute)LoadMethod("glDispatchCompute");
	DispatchComputeIndirect = (PROC_glDispatchComputeIndirect)LoadMethod("glDispatchComputeIndirect");
	DrawArrays = (PROC_glDrawArrays)LoadMethod("glDrawArrays");
	DrawArraysIndirect = (PROC_glDrawArraysIndirect)LoadMethod("glDrawArraysIndirect");
	DrawArraysInstanced = (PROC_glDrawArraysInstanced)LoadMethod("glDrawArraysInstanced");
	DrawArraysInstancedBaseInstance = (PROC_glDrawArraysInstancedBaseInstance)LoadMethod("glDrawArraysInstancedBaseInstance");
	DrawBuffer = (PROC_glDrawBuffer)LoadMethod("glDrawBuffer");
	DrawBuffers = (PROC_glDrawBuffers)LoadMethod("glDrawBuffers");
	DrawElements = (PROC_glDrawElements)LoadMethod("glDrawElements");
	DrawElementsBaseVertex = (PROC_glDrawElementsBaseVertex)LoadMethod("glDrawElementsBaseVertex");
	DrawElementsIndirect = (PROC_glDrawElementsIndirect)LoadMethod("glDrawElementsIndirect");
	DrawElementsInstanced = (PROC_glDrawElementsInstanced)LoadMethod("glDrawElementsInstanced");
	DrawElementsInstancedBaseInstance = (PROC_glDrawElementsInstancedBaseInstance)LoadMethod("glDrawElementsInstancedBaseInstance");
	DrawElementsInstancedBaseVertex = (PROC_glDrawElementsInstancedBaseVertex)LoadMethod("glDrawElementsInstancedBaseVertex");
	DrawElementsInstancedBaseVertexBaseInstance = (PROC_glDrawElementsInstancedBaseVertexBaseInstance)LoadMethod("glDrawElementsInstancedBaseVertexBaseInstance");
	DrawRangeElements = (PROC_glDrawRangeElements)LoadMethod("glDrawRangeElements");
	DrawRangeElementsBaseVertex = (PROC_glDrawRangeElementsBaseVertex)LoadMethod("glDrawRangeElementsBaseVertex");
	DrawTransformFeedback = (PROC_glDrawTransformFeedback)LoadMethod("glDrawTransformFeedback");
	DrawTransformFeedbackInstanced = (PROC_glDrawTransformFeedbackInstanced)LoadMethod("glDrawTransformFeedbackInstanced");
	DrawTransformFeedbackStream = (PROC_glDrawTransformFeedbackStream)LoadMethod("glDrawTransformFeedbackStream");
	DrawTransformFeedbackStreamInstanced = (PROC_glDrawTransformFeedbackStreamInstanced)LoadMethod("glDrawTransformFeedbackStreamInstanced");
	Enable = (PROC_glEnable)LoadMethod("glEnable");
	EnableVertexArrayAttrib = (PROC_glEnableVertexArrayAttrib)LoadMethod("glEnableVertexArrayAttrib");
	EnableVertexAttribArray = (PROC_glEnableVertexAttribArray)LoadMethod("glEnableVertexAttribArray");
	Enablei = (PROC_glEnablei)LoadMethod("glEnablei");
	EndConditionalRender = (PROC_glEndConditionalRender)LoadMethod("glEndConditionalRender");
	EndQuery = (PROC_glEndQuery)LoadMethod("glEndQuery");
	EndQueryIndexed = (PROC_glEndQueryIndexed)LoadMethod("glEndQueryIndexed");
	EndTransformFeedback = (PROC_glEndTransformFeedback)LoadMethod("glEndTransformFeedback");
	FenceSync = (PROC_glFenceSync)LoadMethod("glFenceSync");
	Finish = (PROC_glFinish)LoadMethod("glFinish");
	Flush = (PROC_glFlush)LoadMethod("glFlush");
	FlushMappedBufferRange = (PROC_glFlushMappedBufferRange)LoadMethod("glFlushMappedBufferRange");
	FlushMappedNamedBufferRange = (PROC_glFlushMappedNamedBufferRange)LoadMethod("glFlushMappedNamedBufferRange");
	FramebufferParameteri = (PROC_glFramebufferParameteri)LoadMethod("glFramebufferParameteri");
	FramebufferRenderbuffer = (PROC_glFramebufferRenderbuffer)LoadMethod("glFramebufferRenderbuffer");
	FramebufferTexture = (PROC_glFramebufferTexture)LoadMethod("glFramebufferTexture");
	FramebufferTexture1D = (PROC_glFramebufferTexture1D)LoadMethod("glFramebufferTexture1D");
	FramebufferTexture2D = (PROC_glFramebufferTexture2D)LoadMethod("glFramebufferTexture2D");
	FramebufferTexture3D = (PROC_glFramebufferTexture3D)LoadMethod("glFramebufferTexture3D");
	FramebufferTextureLayer = (PROC_glFramebufferTextureLayer)LoadMethod("glFramebufferTextureLayer");
	FrontFace = (PROC_glFrontFace)LoadMethod("glFrontFace");
	GenBuffers = (PROC_glGenBuffers)LoadMethod("glGenBuffers");
	GenFramebuffers = (PROC_glGenFramebuffers)LoadMethod("glGenFramebuffers");
	GenProgramPipelines = (PROC_glGenProgramPipelines)LoadMethod("glGenProgramPipelines");
	GenQueries = (PROC_glGenQueries)LoadMethod("glGenQueries");
	GenRenderbuffers = (PROC_glGenRenderbuffers)LoadMethod("glGenRenderbuffers");
	GenSamplers = (PROC_glGenSamplers)LoadMethod("glGenSamplers");
	GenTextures = (PROC_glGenTextures)LoadMethod("glGenTextures");
	GenTransformFeedbacks = (PROC_glGenTransformFeedbacks)LoadMethod("glGenTransformFeedbacks");
	GenVertexArrays = (PROC_glGenVertexArrays)LoadMethod("glGenVertexArrays");
	GenerateMipmap = (PROC_glGenerateMipmap)LoadMethod("glGenerateMipmap");
	GenerateTextureMipmap = (PROC_glGenerateTextureMipmap)LoadMethod("glGenerateTextureMipmap");
	GetActiveAtomicCounterBufferiv = (PROC_glGetActiveAtomicCounterBufferiv)LoadMethod("glGetActiveAtomicCounterBufferiv");
	GetActiveAttrib = (PROC_glGetActiveAttrib)LoadMethod("glGetActiveAttrib");
	GetActiveSubroutineName = (PROC_glGetActiveSubroutineName)LoadMethod("glGetActiveSubroutineName");
	GetActiveSubroutineUniformName = (PROC_glGetActiveSubroutineUniformName)LoadMethod("glGetActiveSubroutineUniformName");
	GetActiveSubroutineUniformiv = (PROC_glGetActiveSubroutineUniformiv)LoadMethod("glGetActiveSubroutineUniformiv");
	GetActiveUniform = (PROC_glGetActiveUniform)LoadMethod("glGetActiveUniform");
	GetActiveUniformBlockName = (PROC_glGetActiveUniformBlockName)LoadMethod("glGetActiveUniformBlockName");
	GetActiveUniformBlockiv = (PROC_glGetActiveUniformBlockiv)LoadMethod("glGetActiveUniformBlockiv");
	GetActiveUniformName = (PROC_glGetActiveUniformName)LoadMethod("glGetActiveUniformName");
	GetActiveUniformsiv = (PROC_glGetActiveUniformsiv)LoadMethod("glGetActiveUniformsiv");
	GetAttachedShaders = (PROC_glGetAttachedShaders)LoadMethod("glGetAttachedShaders");
	GetAttribLocation = (PROC_glGetAttribLocation)LoadMethod("glGetAttribLocation");
	GetBooleani_v = (PROC_glGetBooleani_v)LoadMethod("glGetBooleani_v");
	GetBooleanv = (PROC_glGetBooleanv)LoadMethod("glGetBooleanv");
	GetBufferParameteri64v = (PROC_glGetBufferParameteri64v)LoadMethod("glGetBufferParameteri64v");
	GetBufferParameteriv = (PROC_glGetBufferParameteriv)LoadMethod("glGetBufferParameteriv");
	GetBufferPointerv = (PROC_glGetBufferPointerv)LoadMethod("glGetBufferPointerv");
	GetBufferSubData = (PROC_glGetBufferSubData)LoadMethod("glGetBufferSubData");
	GetCompressedTexImage = (PROC_glGetCompressedTexImage)LoadMethod("glGetCompressedTexImage");
	GetCompressedTextureImage = (PROC_glGetCompressedTextureImage)LoadMethod("glGetCompressedTextureImage");
	GetCompressedTextureSubImage = (PROC_glGetCompressedTextureSubImage)LoadMethod("glGetCompressedTextureSubImage");
	GetDebugMessageLog = (PROC_glGetDebugMessageLog)LoadMethod("glGetDebugMessageLog");
	GetDoublei_v = (PROC_glGetDoublei_v)LoadMethod("glGetDoublei_v");
	GetDoublev = (PROC_glGetDoublev)LoadMethod("glGetDoublev");
	GetError = (PROC_glGetError)LoadMethod("glGetError");
	GetFloati_v = (PROC_glGetFloati_v)LoadMethod("glGetFloati_v");
	GetFloatv = (PROC_glGetFloatv)LoadMethod("glGetFloatv");
	GetFragDataIndex = (PROC_glGetFragDataIndex)LoadMethod("glGetFragDataIndex");
	GetFragDataLocation = (PROC_glGetFragDataLocation)LoadMethod("glGetFragDataLocation");
	GetFramebufferAttachmentParameteriv = (PROC_glGetFramebufferAttachmentParameteriv)LoadMethod("glGetFramebufferAttachmentParameteriv");
	GetFramebufferParameteriv = (PROC_glGetFramebufferParameteriv)LoadMethod("glGetFramebufferParameteriv");
	GetGraphicsResetStatus = (PROC_glGetGraphicsResetStatus)LoadMethod("glGetGraphicsResetStatus");
	GetInteger64i_v = (PROC_glGetInteger64i_v)LoadMethod("glGetInteger64i_v");
	GetInteger64v = (PROC_glGetInteger64v)LoadMethod("glGetInteger64v");
	GetIntegeri_v = (PROC_glGetIntegeri_v)LoadMethod("glGetIntegeri_v");
	GetIntegerv = (PROC_glGetIntegerv)LoadMethod("glGetIntegerv");
	GetInternalformati64v = (PROC_glGetInternalformati64v)LoadMethod("glGetInternalformati64v");
	GetInternalformativ = (PROC_glGetInternalformativ)LoadMethod("glGetInternalformativ");
	GetMultisamplefv = (PROC_glGetMultisamplefv)LoadMethod("glGetMultisamplefv");
	GetNamedBufferParameteri64v = (PROC_glGetNamedBufferParameteri64v)LoadMethod("glGetNamedBufferParameteri64v");
	GetNamedBufferParameteriv = (PROC_glGetNamedBufferParameteriv)LoadMethod("glGetNamedBufferParameteriv");
	GetNamedBufferPointerv = (PROC_glGetNamedBufferPointerv)LoadMethod("glGetNamedBufferPointerv");
	GetNamedBufferSubData = (PROC_glGetNamedBufferSubData)LoadMethod("glGetNamedBufferSubData");
	GetNamedFramebufferAttachmentParameteriv = (PROC_glGetNamedFramebufferAttachmentParameteriv)LoadMethod("glGetNamedFramebufferAttachmentParameteriv");
	GetNamedFramebufferParameteriv = (PROC_glGetNamedFramebufferParameteriv)LoadMethod("glGetNamedFramebufferParameteriv");
	GetNamedRenderbufferParameteriv = (PROC_glGetNamedRenderbufferParameteriv)LoadMethod("glGetNamedRenderbufferParameteriv");
	GetObjectLabel = (PROC_glGetObjectLabel)LoadMethod("glGetObjectLabel");
	GetObjectPtrLabel = (PROC_glGetObjectPtrLabel)LoadMethod("glGetObjectPtrLabel");
	GetPointerv = (PROC_glGetPointerv)LoadMethod("glGetPointerv");
	GetProgramBinary = (PROC_glGetProgramBinary)LoadMethod("glGetProgramBinary");
	GetProgramInfoLog = (PROC_glGetProgramInfoLog)LoadMethod("glGetProgramInfoLog");
	GetProgramInterfaceiv = (PROC_glGetProgramInterfaceiv)LoadMethod("glGetProgramInterfaceiv");
	GetProgramPipelineInfoLog = (PROC_glGetProgramPipelineInfoLog)LoadMethod("glGetProgramPipelineInfoLog");
	GetProgramPipelineiv = (PROC_glGetProgramPipelineiv)LoadMethod("glGetProgramPipelineiv");
	GetProgramResourceIndex = (PROC_glGetProgramResourceIndex)LoadMethod("glGetProgramResourceIndex");
	GetProgramResourceLocation = (PROC_glGetProgramResourceLocation)LoadMethod("glGetProgramResourceLocation");
	GetProgramResourceLocationIndex = (PROC_glGetProgramResourceLocationIndex)LoadMethod("glGetProgramResourceLocationIndex");
	GetProgramResourceName = (PROC_glGetProgramResourceName)LoadMethod("glGetProgramResourceName");
	GetProgramResourceiv = (PROC_glGetProgramResourceiv)LoadMethod("glGetProgramResourceiv");
	GetProgramStageiv = (PROC_glGetProgramStageiv)LoadMethod("glGetProgramStageiv");
	GetProgramiv = (PROC_glGetProgramiv)LoadMethod("glGetProgramiv");
	GetQueryBufferObjecti64v = (PROC_glGetQueryBufferObjecti64v)LoadMethod("glGetQueryBufferObjecti64v");
	GetQueryBufferObjectiv = (PROC_glGetQueryBufferObjectiv)LoadMethod("glGetQueryBufferObjectiv");
	GetQueryBufferObjectui64v = (PROC_glGetQueryBufferObjectui64v)LoadMethod("glGetQueryBufferObjectui64v");
	GetQueryBufferObjectuiv = (PROC_glGetQueryBufferObjectuiv)LoadMethod("glGetQueryBufferObjectuiv");
	GetQueryIndexediv = (PROC_glGetQueryIndexediv)LoadMethod("glGetQueryIndexediv");
	GetQueryObjecti64v = (PROC_glGetQueryObjecti64v)LoadMethod("glGetQueryObjecti64v");
	GetQueryObjectiv = (PROC_glGetQueryObjectiv)LoadMethod("glGetQueryObjectiv");
	GetQueryObjectui64v = (PROC_glGetQueryObjectui64v)LoadMethod("glGetQueryObjectui64v");
	GetQueryObjectuiv = (PROC_glGetQueryObjectuiv)LoadMethod("glGetQueryObjectuiv");
	GetQueryiv = (PROC_glGetQueryiv)LoadMethod("glGetQueryiv");
	GetRenderbufferParameteriv = (PROC_glGetRenderbufferParameteriv)LoadMethod("glGetRenderbufferParameteriv");
	GetSamplerParameterIiv = (PROC_glGetSamplerParameterIiv)LoadMethod("glGetSamplerParameterIiv");
	GetSamplerParameterIuiv = (PROC_glGetSamplerParameterIuiv)LoadMethod("glGetSamplerParameterIuiv");
	GetSamplerParameterfv = (PROC_glGetSamplerParameterfv)LoadMethod("glGetSamplerParameterfv");
	GetSamplerParameteriv = (PROC_glGetSamplerParameteriv)LoadMethod("glGetSamplerParameteriv");
	GetShaderInfoLog = (PROC_glGetShaderInfoLog)LoadMethod("glGetShaderInfoLog");
	GetShaderPrecisionFormat = (PROC_glGetShaderPrecisionFormat)LoadMethod("glGetShaderPrecisionFormat");
	GetShaderSource = (PROC_glGetShaderSource)LoadMethod("glGetShaderSource");
	GetShaderiv = (PROC_glGetShaderiv)LoadMethod("glGetShaderiv");
	GetString = (PROC_glGetString)LoadMethod("glGetString");
	GetStringi = (PROC_glGetStringi)LoadMethod("glGetStringi");
	GetSubroutineIndex = (PROC_glGetSubroutineIndex)LoadMethod("glGetSubroutineIndex");
	GetSubroutineUniformLocation = (PROC_glGetSubroutineUniformLocation)LoadMethod("glGetSubroutineUniformLocation");
	GetSynciv = (PROC_glGetSynciv)LoadMethod("glGetSynciv");
	GetTexImage = (PROC_glGetTexImage)LoadMethod("glGetTexImage");
	GetTexLevelParameterfv = (PROC_glGetTexLevelParameterfv)LoadMethod("glGetTexLevelParameterfv");
	GetTexLevelParameteriv = (PROC_glGetTexLevelParameteriv)LoadMethod("glGetTexLevelParameteriv");
	GetTexParameterIiv = (PROC_glGetTexParameterIiv)LoadMethod("glGetTexParameterIiv");
	GetTexParameterIuiv = (PROC_glGetTexParameterIuiv)LoadMethod("glGetTexParameterIuiv");
	GetTexParameterfv = (PROC_glGetTexParameterfv)LoadMethod("glGetTexParameterfv");
	GetTexParameteriv = (PROC_glGetTexParameteriv)LoadMethod("glGetTexParameteriv");
	GetTextureImage = (PROC_glGetTextureImage)LoadMethod("glGetTextureImage");
	GetTextureLevelParameterfv = (PROC_glGetTextureLevelParameterfv)LoadMethod("glGetTextureLevelParameterfv");
	GetTextureLevelParameteriv = (PROC_glGetTextureLevelParameteriv)LoadMethod("glGetTextureLevelParameteriv");
	GetTextureParameterIiv = (PROC_glGetTextureParameterIiv)LoadMethod("glGetTextureParameterIiv");
	GetTextureParameterIuiv = (PROC_glGetTextureParameterIuiv)LoadMethod("glGetTextureParameterIuiv");
	GetTextureParameterfv = (PROC_glGetTextureParameterfv)LoadMethod("glGetTextureParameterfv");
	GetTextureParameteriv = (PROC_glGetTextureParameteriv)LoadMethod("glGetTextureParameteriv");
	GetTextureSubImage = (PROC_glGetTextureSubImage)LoadMethod("glGetTextureSubImage");
	GetTransformFeedbackVarying = (PROC_glGetTransformFeedbackVarying)LoadMethod("glGetTransformFeedbackVarying");
	GetTransformFeedbacki64_v = (PROC_glGetTransformFeedbacki64_v)LoadMethod("glGetTransformFeedbacki64_v");
	GetTransformFeedbacki_v = (PROC_glGetTransformFeedbacki_v)LoadMethod("glGetTransformFeedbacki_v");
	GetTransformFeedbackiv = (PROC_glGetTransformFeedbackiv)LoadMethod("glGetTransformFeedbackiv");
	GetUniformBlockIndex = (PROC_glGetUniformBlockIndex)LoadMethod("glGetUniformBlockIndex");
	GetUniformIndices = (PROC_glGetUniformIndices)LoadMethod("glGetUniformIndices");
	GetUniformLocation = (PROC_glGetUniformLocation)LoadMethod("glGetUniformLocation");
	GetUniformSubroutineuiv = (PROC_glGetUniformSubroutineuiv)LoadMethod("glGetUniformSubroutineuiv");
	GetUniformdv = (PROC_glGetUniformdv)LoadMethod("glGetUniformdv");
	GetUniformfv = (PROC_glGetUniformfv)LoadMethod("glGetUniformfv");
	GetUniformiv = (PROC_glGetUniformiv)LoadMethod("glGetUniformiv");
	GetUniformuiv = (PROC_glGetUniformuiv)LoadMethod("glGetUniformuiv");
	GetVertexArrayIndexed64iv = (PROC_glGetVertexArrayIndexed64iv)LoadMethod("glGetVertexArrayIndexed64iv");
	GetVertexArrayIndexediv = (PROC_glGetVertexArrayIndexediv)LoadMethod("glGetVertexArrayIndexediv");
	GetVertexArrayiv = (PROC_glGetVertexArrayiv)LoadMethod("glGetVertexArrayiv");
	GetVertexAttribIiv = (PROC_glGetVertexAttribIiv)LoadMethod("glGetVertexAttribIiv");
	GetVertexAttribIuiv = (PROC_glGetVertexAttribIuiv)LoadMethod("glGetVertexAttribIuiv");
	GetVertexAttribLdv = (PROC_glGetVertexAttribLdv)LoadMethod("glGetVertexAttribLdv");
	GetVertexAttribPointerv = (PROC_glGetVertexAttribPointerv)LoadMethod("glGetVertexAttribPointerv");
	GetVertexAttribdv = (PROC_glGetVertexAttribdv)LoadMethod("glGetVertexAttribdv");
	GetVertexAttribfv = (PROC_glGetVertexAttribfv)LoadMethod("glGetVertexAttribfv");
	GetVertexAttribiv = (PROC_glGetVertexAttribiv)LoadMethod("glGetVertexAttribiv");
	GetnCompressedTexImage = (PROC_glGetnCompressedTexImage)LoadMethod("glGetnCompressedTexImage");
	GetnTexImage = (PROC_glGetnTexImage)LoadMethod("glGetnTexImage");
	GetnUniformdv = (PROC_glGetnUniformdv)LoadMethod("glGetnUniformdv");
	GetnUniformfv = (PROC_glGetnUniformfv)LoadMethod("glGetnUniformfv");
	GetnUniformiv = (PROC_glGetnUniformiv)LoadMethod("glGetnUniformiv");
	GetnUniformuiv = (PROC_glGetnUniformuiv)LoadMethod("glGetnUniformuiv");
	Hint = (PROC_glHint)LoadMethod("glHint");
	InvalidateBufferData = (PROC_glInvalidateBufferData)LoadMethod("glInvalidateBufferData");
	InvalidateBufferSubData = (PROC_glInvalidateBufferSubData)LoadMethod("glInvalidateBufferSubData");
	InvalidateFramebuffer = (PROC_glInvalidateFramebuffer)LoadMethod("glInvalidateFramebuffer");
	InvalidateNamedFramebufferData = (PROC_glInvalidateNamedFramebufferData)LoadMethod("glInvalidateNamedFramebufferData");
	InvalidateNamedFramebufferSubData = (PROC_glInvalidateNamedFramebufferSubData)LoadMethod("glInvalidateNamedFramebufferSubData");
	InvalidateSubFramebuffer = (PROC_glInvalidateSubFramebuffer)LoadMethod("glInvalidateSubFramebuffer");
	InvalidateTexImage = (PROC_glInvalidateTexImage)LoadMethod("glInvalidateTexImage");
	InvalidateTexSubImage = (PROC_glInvalidateTexSubImage)LoadMethod("glInvalidateTexSubImage");
	IsBuffer = (PROC_glIsBuffer)LoadMethod("glIsBuffer");
	IsEnabled = (PROC_glIsEnabled)LoadMethod("glIsEnabled");
	IsEnabledi = (PROC_glIsEnabledi)LoadMethod("glIsEnabledi");
	IsFramebuffer = (PROC_glIsFramebuffer)LoadMethod("glIsFramebuffer");
	IsProgram = (PROC_glIsProgram)LoadMethod("glIsProgram");
	IsProgramPipeline = (PROC_glIsProgramPipeline)LoadMethod("glIsProgramPipeline");
	IsQuery = (PROC_glIsQuery)LoadMethod("glIsQuery");
	IsRenderbuffer = (PROC_glIsRenderbuffer)LoadMethod("glIsRenderbuffer");
	IsSampler = (PROC_glIsSampler)LoadMethod("glIsSampler");
	IsShader = (PROC_glIsShader)LoadMethod("glIsShader");
	IsSync = (PROC_glIsSync)LoadMethod("glIsSync");
	IsTexture = (PROC_glIsTexture)LoadMethod("glIsTexture");
	IsTransformFeedback = (PROC_glIsTransformFeedback)LoadMethod("glIsTransformFeedback");
	IsVertexArray = (PROC_glIsVertexArray)LoadMethod("glIsVertexArray");
	LineWidth = (PROC_glLineWidth)LoadMethod("glLineWidth");
	LinkProgram = (PROC_glLinkProgram)LoadMethod("glLinkProgram");
	LogicOp = (PROC_glLogicOp)LoadMethod("glLogicOp");
	MapBuffer = (PROC_glMapBuffer)LoadMethod("glMapBuffer");
	MapBufferRange = (PROC_glMapBufferRange)LoadMethod("glMapBufferRange");
	MapNamedBuffer = (PROC_glMapNamedBuffer)LoadMethod("glMapNamedBuffer");
	MapNamedBufferRange = (PROC_glMapNamedBufferRange)LoadMethod("glMapNamedBufferRange");
	MemoryBarrier = (PROC_glMemoryBarrier)LoadMethod("glMemoryBarrier");
	MemoryBarrierByRegion = (PROC_glMemoryBarrierByRegion)LoadMethod("glMemoryBarrierByRegion");
	MinSampleShading = (PROC_glMinSampleShading)LoadMethod("glMinSampleShading");
	MultiDrawArrays = (PROC_glMultiDrawArrays)LoadMethod("glMultiDrawArrays");
	MultiDrawArraysIndirect = (PROC_glMultiDrawArraysIndirect)LoadMethod("glMultiDrawArraysIndirect");
	MultiDrawElements = (PROC_glMultiDrawElements)LoadMethod("glMultiDrawElements");
	MultiDrawElementsBaseVertex = (PROC_glMultiDrawElementsBaseVertex)LoadMethod("glMultiDrawElementsBaseVertex");
	MultiDrawElementsIndirect = (PROC_glMultiDrawElementsIndirect)LoadMethod("glMultiDrawElementsIndirect");
	NamedBufferData = (PROC_glNamedBufferData)LoadMethod("glNamedBufferData");
	NamedBufferStorage = (PROC_glNamedBufferStorage)LoadMethod("glNamedBufferStorage");
	NamedBufferSubData = (PROC_glNamedBufferSubData)LoadMethod("glNamedBufferSubData");
	NamedFramebufferDrawBuffer = (PROC_glNamedFramebufferDrawBuffer)LoadMethod("glNamedFramebufferDrawBuffer");
	NamedFramebufferDrawBuffers = (PROC_glNamedFramebufferDrawBuffers)LoadMethod("glNamedFramebufferDrawBuffers");
	NamedFramebufferParameteri = (PROC_glNamedFramebufferParameteri)LoadMethod("glNamedFramebufferParameteri");
	NamedFramebufferReadBuffer = (PROC_glNamedFramebufferReadBuffer)LoadMethod("glNamedFramebufferReadBuffer");
	NamedFramebufferRenderbuffer = (PROC_glNamedFramebufferRenderbuffer)LoadMethod("glNamedFramebufferRenderbuffer");
	NamedFramebufferTexture = (PROC_glNamedFramebufferTexture)LoadMethod("glNamedFramebufferTexture");
	NamedFramebufferTextureLayer = (PROC_glNamedFramebufferTextureLayer)LoadMethod("glNamedFramebufferTextureLayer");
	NamedRenderbufferStorage = (PROC_glNamedRenderbufferStorage)LoadMethod("glNamedRenderbufferStorage");
	NamedRenderbufferStorageMultisample = (PROC_glNamedRenderbufferStorageMultisample)LoadMethod("glNamedRenderbufferStorageMultisample");
	ObjectLabel = (PROC_glObjectLabel)LoadMethod("glObjectLabel");
	ObjectPtrLabel = (PROC_glObjectPtrLabel)LoadMethod("glObjectPtrLabel");
	PatchParameterfv = (PROC_glPatchParameterfv)LoadMethod("glPatchParameterfv");
	PatchParameteri = (PROC_glPatchParameteri)LoadMethod("glPatchParameteri");
	PauseTransformFeedback = (PROC_glPauseTransformFeedback)LoadMethod("glPauseTransformFeedback");
	PixelStoref = (PROC_glPixelStoref)LoadMethod("glPixelStoref");
	PixelStorei = (PROC_glPixelStorei)LoadMethod("glPixelStorei");
	PointParameterf = (PROC_glPointParameterf)LoadMethod("glPointParameterf");
	PointParameterfv = (PROC_glPointParameterfv)LoadMethod("glPointParameterfv");
	PointParameteri = (PROC_glPointParameteri)LoadMethod("glPointParameteri");
	PointParameteriv = (PROC_glPointParameteriv)LoadMethod("glPointParameteriv");
	PointSize = (PROC_glPointSize)LoadMethod("glPointSize");
	PolygonMode = (PROC_glPolygonMode)LoadMethod("glPolygonMode");
	PolygonOffset = (PROC_glPolygonOffset)LoadMethod("glPolygonOffset");
	PopDebugGroup = (PROC_glPopDebugGroup)LoadMethod("glPopDebugGroup");
	PrimitiveRestartIndex = (PROC_glPrimitiveRestartIndex)LoadMethod("glPrimitiveRestartIndex");
	ProgramBinary = (PROC_glProgramBinary)LoadMethod("glProgramBinary");
	ProgramParameteri = (PROC_glProgramParameteri)LoadMethod("glProgramParameteri");
	ProgramUniform1d = (PROC_glProgramUniform1d)LoadMethod("glProgramUniform1d");
	ProgramUniform1dv = (PROC_glProgramUniform1dv)LoadMethod("glProgramUniform1dv");
	ProgramUniform1f = (PROC_glProgramUniform1f)LoadMethod("glProgramUniform1f");
	ProgramUniform1fv = (PROC_glProgramUniform1fv)LoadMethod("glProgramUniform1fv");
	ProgramUniform1i = (PROC_glProgramUniform1i)LoadMethod("glProgramUniform1i");
	ProgramUniform1iv = (PROC_glProgramUniform1iv)LoadMethod("glProgramUniform1iv");
	ProgramUniform1ui = (PROC_glProgramUniform1ui)LoadMethod("glProgramUniform1ui");
	ProgramUniform1uiv = (PROC_glProgramUniform1uiv)LoadMethod("glProgramUniform1uiv");
	ProgramUniform2d = (PROC_glProgramUniform2d)LoadMethod("glProgramUniform2d");
	ProgramUniform2dv = (PROC_glProgramUniform2dv)LoadMethod("glProgramUniform2dv");
	ProgramUniform2f = (PROC_glProgramUniform2f)LoadMethod("glProgramUniform2f");
	ProgramUniform2fv = (PROC_glProgramUniform2fv)LoadMethod("glProgramUniform2fv");
	ProgramUniform2i = (PROC_glProgramUniform2i)LoadMethod("glProgramUniform2i");
	ProgramUniform2iv = (PROC_glProgramUniform2iv)LoadMethod("glProgramUniform2iv");
	ProgramUniform2ui = (PROC_glProgramUniform2ui)LoadMethod("glProgramUniform2ui");
	ProgramUniform2uiv = (PROC_glProgramUniform2uiv)LoadMethod("glProgramUniform2uiv");
	ProgramUniform3d = (PROC_glProgramUniform3d)LoadMethod("glProgramUniform3d");
	ProgramUniform3dv = (PROC_glProgramUniform3dv)LoadMethod("glProgramUniform3dv");
	ProgramUniform3f = (PROC_glProgramUniform3f)LoadMethod("glProgramUniform3f");
	ProgramUniform3fv = (PROC_glProgramUniform3fv)LoadMethod("glProgramUniform3fv");
	ProgramUniform3i = (PROC_glProgramUniform3i)LoadMethod("glProgramUniform3i");
	ProgramUniform3iv = (PROC_glProgramUniform3iv)LoadMethod("glProgramUniform3iv");
	ProgramUniform3ui = (PROC_glProgramUniform3ui)LoadMethod("glProgramUniform3ui");
	ProgramUniform3uiv = (PROC_glProgramUniform3uiv)LoadMethod("glProgramUniform3uiv");
	ProgramUniform4d = (PROC_glProgramUniform4d)LoadMethod("glProgramUniform4d");
	ProgramUniform4dv = (PROC_glProgramUniform4dv)LoadMethod("glProgramUniform4dv");
	ProgramUniform4f = (PROC_glProgramUniform4f)LoadMethod("glProgramUniform4f");
	ProgramUniform4fv = (PROC_glProgramUniform4fv)LoadMethod("glProgramUniform4fv");
	ProgramUniform4i = (PROC_glProgramUniform4i)LoadMethod("glProgramUniform4i");
	ProgramUniform4iv = (PROC_glProgramUniform4iv)LoadMethod("glProgramUniform4iv");
	ProgramUniform4ui = (PROC_glProgramUniform4ui)LoadMethod("glProgramUniform4ui");
	ProgramUniform4uiv = (PROC_glProgramUniform4uiv)LoadMethod("glProgramUniform4uiv");
	ProgramUniformMatrix2dv = (PROC_glProgramUniformMatrix2dv)LoadMethod("glProgramUniformMatrix2dv");
	ProgramUniformMatrix2fv = (PROC_glProgramUniformMatrix2fv)LoadMethod("glProgramUniformMatrix2fv");
	ProgramUniformMatrix2x3dv = (PROC_glProgramUniformMatrix2x3dv)LoadMethod("glProgramUniformMatrix2x3dv");
	ProgramUniformMatrix2x3fv = (PROC_glProgramUniformMatrix2x3fv)LoadMethod("glProgramUniformMatrix2x3fv");
	ProgramUniformMatrix2x4dv = (PROC_glProgramUniformMatrix2x4dv)LoadMethod("glProgramUniformMatrix2x4dv");
	ProgramUniformMatrix2x4fv = (PROC_glProgramUniformMatrix2x4fv)LoadMethod("glProgramUniformMatrix2x4fv");
	ProgramUniformMatrix3dv = (PROC_glProgramUniformMatrix3dv)LoadMethod("glProgramUniformMatrix3dv");
	ProgramUniformMatrix3fv = (PROC_glProgramUniformMatrix3fv)LoadMethod("glProgramUniformMatrix3fv");
	ProgramUniformMatrix3x2dv = (PROC_glProgramUniformMatrix3x2dv)LoadMethod("glProgramUniformMatrix3x2dv");
	ProgramUniformMatrix3x2fv = (PROC_glProgramUniformMatrix3x2fv)LoadMethod("glProgramUniformMatrix3x2fv");
	ProgramUniformMatrix3x4dv = (PROC_glProgramUniformMatrix3x4dv)LoadMethod("glProgramUniformMatrix3x4dv");
	ProgramUniformMatrix3x4fv = (PROC_glProgramUniformMatrix3x4fv)LoadMethod("glProgramUniformMatrix3x4fv");
	ProgramUniformMatrix4dv = (PROC_glProgramUniformMatrix4dv)LoadMethod("glProgramUniformMatrix4dv");
	ProgramUniformMatrix4fv = (PROC_glProgramUniformMatrix4fv)LoadMethod("glProgramUniformMatrix4fv");
	ProgramUniformMatrix4x2dv = (PROC_glProgramUniformMatrix4x2dv)LoadMethod("glProgramUniformMatrix4x2dv");
	ProgramUniformMatrix4x2fv = (PROC_glProgramUniformMatrix4x2fv)LoadMethod("glProgramUniformMatrix4x2fv");
	ProgramUniformMatrix4x3dv = (PROC_glProgramUniformMatrix4x3dv)LoadMethod("glProgramUniformMatrix4x3dv");
	ProgramUniformMatrix4x3fv = (PROC_glProgramUniformMatrix4x3fv)LoadMethod("glProgramUniformMatrix4x3fv");
	ProvokingVertex = (PROC_glProvokingVertex)LoadMethod("glProvokingVertex");
	PushDebugGroup = (PROC_glPushDebugGroup)LoadMethod("glPushDebugGroup");
	QueryCounter = (PROC_glQueryCounter)LoadMethod("glQueryCounter");
	ReadBuffer = (PROC_glReadBuffer)LoadMethod("glReadBuffer");
	ReadPixels = (PROC_glReadPixels)LoadMethod("glReadPixels");
	ReadnPixels = (PROC_glReadnPixels)LoadMethod("glReadnPixels");
	ReleaseShaderCompiler = (PROC_glReleaseShaderCompiler)LoadMethod("glReleaseShaderCompiler");
	RenderbufferStorage = (PROC_glRenderbufferStorage)LoadMethod("glRenderbufferStorage");
	RenderbufferStorageMultisample = (PROC_glRenderbufferStorageMultisample)LoadMethod("glRenderbufferStorageMultisample");
	ResumeTransformFeedback = (PROC_glResumeTransformFeedback)LoadMethod("glResumeTransformFeedback");
	SampleCoverage = (PROC_glSampleCoverage)LoadMethod("glSampleCoverage");
	SampleMaski = (PROC_glSampleMaski)LoadMethod("glSampleMaski");
	SamplerParameterIiv = (PROC_glSamplerParameterIiv)LoadMethod("glSamplerParameterIiv");
	SamplerParameterIuiv = (PROC_glSamplerParameterIuiv)LoadMethod("glSamplerParameterIuiv");
	SamplerParameterf = (PROC_glSamplerParameterf)LoadMethod("glSamplerParameterf");
	SamplerParameterfv = (PROC_glSamplerParameterfv)LoadMethod("glSamplerParameterfv");
	SamplerParameteri = (PROC_glSamplerParameteri)LoadMethod("glSamplerParameteri");
	SamplerParameteriv = (PROC_glSamplerParameteriv)LoadMethod("glSamplerParameteriv");
	Scissor = (PROC_glScissor)LoadMethod("glScissor");
	ScissorArrayv = (PROC_glScissorArrayv)LoadMethod("glScissorArrayv");
	ScissorIndexed = (PROC_glScissorIndexed)LoadMethod("glScissorIndexed");
	ScissorIndexedv = (PROC_glScissorIndexedv)LoadMethod("glScissorIndexedv");
	ShaderBinary = (PROC_glShaderBinary)LoadMethod("glShaderBinary");
	ShaderSource = (PROC_glShaderSource)LoadMethod("glShaderSource");
	ShaderStorageBlockBinding = (PROC_glShaderStorageBlockBinding)LoadMethod("glShaderStorageBlockBinding");
	StencilFunc = (PROC_glStencilFunc)LoadMethod("glStencilFunc");
	StencilFuncSeparate = (PROC_glStencilFuncSeparate)LoadMethod("glStencilFuncSeparate");
	StencilMask = (PROC_glStencilMask)LoadMethod("glStencilMask");
	StencilMaskSeparate = (PROC_glStencilMaskSeparate)LoadMethod("glStencilMaskSeparate");
	StencilOp = (PROC_glStencilOp)LoadMethod("glStencilOp");
	StencilOpSeparate = (PROC_glStencilOpSeparate)LoadMethod("glStencilOpSeparate");
	TexBuffer = (PROC_glTexBuffer)LoadMethod("glTexBuffer");
	TexBufferRange = (PROC_glTexBufferRange)LoadMethod("glTexBufferRange");
	TexImage1D = (PROC_glTexImage1D)LoadMethod("glTexImage1D");
	TexImage2D = (PROC_glTexImage2D)LoadMethod("glTexImage2D");
	TexImage2DMultisample = (PROC_glTexImage2DMultisample)LoadMethod("glTexImage2DMultisample");
	TexImage3D = (PROC_glTexImage3D)LoadMethod("glTexImage3D");
	TexImage3DMultisample = (PROC_glTexImage3DMultisample)LoadMethod("glTexImage3DMultisample");
	TexParameterIiv = (PROC_glTexParameterIiv)LoadMethod("glTexParameterIiv");
	TexParameterIuiv = (PROC_glTexParameterIuiv)LoadMethod("glTexParameterIuiv");
	TexParameterf = (PROC_glTexParameterf)LoadMethod("glTexParameterf");
	TexParameterfv = (PROC_glTexParameterfv)LoadMethod("glTexParameterfv");
	TexParameteri = (PROC_glTexParameteri)LoadMethod("glTexParameteri");
	TexParameteriv = (PROC_glTexParameteriv)LoadMethod("glTexParameteriv");
	TexStorage1D = (PROC_glTexStorage1D)LoadMethod("glTexStorage1D");
	TexStorage2D = (PROC_glTexStorage2D)LoadMethod("glTexStorage2D");
	TexStorage2DMultisample = (PROC_glTexStorage2DMultisample)LoadMethod("glTexStorage2DMultisample");
	TexStorage3D = (PROC_glTexStorage3D)LoadMethod("glTexStorage3D");
	TexStorage3DMultisample = (PROC_glTexStorage3DMultisample)LoadMethod("glTexStorage3DMultisample");
	TexSubImage1D = (PROC_glTexSubImage1D)LoadMethod("glTexSubImage1D");
	TexSubImage2D = (PROC_glTexSubImage2D)LoadMethod("glTexSubImage2D");
	TexSubImage3D = (PROC_glTexSubImage3D)LoadMethod("glTexSubImage3D");
	TextureBarrier = (PROC_glTextureBarrier)LoadMethod("glTextureBarrier");
	TextureBuffer = (PROC_glTextureBuffer)LoadMethod("glTextureBuffer");
	TextureBufferRange = (PROC_glTextureBufferRange)LoadMethod("glTextureBufferRange");
	TextureParameterIiv = (PROC_glTextureParameterIiv)LoadMethod("glTextureParameterIiv");
	TextureParameterIuiv = (PROC_glTextureParameterIuiv)LoadMethod("glTextureParameterIuiv");
	TextureParameterf = (PROC_glTextureParameterf)LoadMethod("glTextureParameterf");
	TextureParameterfv = (PROC_glTextureParameterfv)LoadMethod("glTextureParameterfv");
	TextureParameteri = (PROC_glTextureParameteri)LoadMethod("glTextureParameteri");
	TextureParameteriv = (PROC_glTextureParameteriv)LoadMethod("glTextureParameteriv");
	TextureStorage1D = (PROC_glTextureStorage1D)LoadMethod("glTextureStorage1D");
	TextureStorage2D = (PROC_glTextureStorage2D)LoadMethod("glTextureStorage2D");
	TextureStorage2DMultisample = (PROC_glTextureStorage2DMultisample)LoadMethod("glTextureStorage2DMultisample");
	TextureStorage3D = (PROC_glTextureStorage3D)LoadMethod("glTextureStorage3D");
	TextureStorage3DMultisample = (PROC_glTextureStorage3DMultisample)LoadMethod("glTextureStorage3DMultisample");
	TextureSubImage1D = (PROC_glTextureSubImage1D)LoadMethod("glTextureSubImage1D");
	TextureSubImage2D = (PROC_glTextureSubImage2D)LoadMethod("glTextureSubImage2D");
	TextureSubImage3D = (PROC_glTextureSubImage3D)LoadMethod("glTextureSubImage3D");
	TextureView = (PROC_glTextureView)LoadMethod("glTextureView");
	TransformFeedbackBufferBase = (PROC_glTransformFeedbackBufferBase)LoadMethod("glTransformFeedbackBufferBase");
	TransformFeedbackBufferRange = (PROC_glTransformFeedbackBufferRange)LoadMethod("glTransformFeedbackBufferRange");
	TransformFeedbackVaryings = (PROC_glTransformFeedbackVaryings)LoadMethod("glTransformFeedbackVaryings");
	Uniform1d = (PROC_glUniform1d)LoadMethod("glUniform1d");
	Uniform1dv = (PROC_glUniform1dv)LoadMethod("glUniform1dv");
	Uniform1f = (PROC_glUniform1f)LoadMethod("glUniform1f");
	Uniform1fv = (PROC_glUniform1fv)LoadMethod("glUniform1fv");
	Uniform1i = (PROC_glUniform1i)LoadMethod("glUniform1i");
	Uniform1iv = (PROC_glUniform1iv)LoadMethod("glUniform1iv");
	Uniform1ui = (PROC_glUniform1ui)LoadMethod("glUniform1ui");
	Uniform1uiv = (PROC_glUniform1uiv)LoadMethod("glUniform1uiv");
	Uniform2d = (PROC_glUniform2d)LoadMethod("glUniform2d");
	Uniform2dv = (PROC_glUniform2dv)LoadMethod("glUniform2dv");
	Uniform2f = (PROC_glUniform2f)LoadMethod("glUniform2f");
	Uniform2fv = (PROC_glUniform2fv)LoadMethod("glUniform2fv");
	Uniform2i = (PROC_glUniform2i)LoadMethod("glUniform2i");
	Uniform2iv = (PROC_glUniform2iv)LoadMethod("glUniform2iv");
	Uniform2ui = (PROC_glUniform2ui)LoadMethod("glUniform2ui");
	Uniform2uiv = (PROC_glUniform2uiv)LoadMethod("glUniform2uiv");
	Uniform3d = (PROC_glUniform3d)LoadMethod("glUniform3d");
	Uniform3dv = (PROC_glUniform3dv)LoadMethod("glUniform3dv");
	Uniform3f = (PROC_glUniform3f)LoadMethod("glUniform3f");
	Uniform3fv = (PROC_glUniform3fv)LoadMethod("glUniform3fv");
	Uniform3i = (PROC_glUniform3i)LoadMethod("glUniform3i");
	Uniform3iv = (PROC_glUniform3iv)LoadMethod("glUniform3iv");
	Uniform3ui = (PROC_glUniform3ui)LoadMethod("glUniform3ui");
	Uniform3uiv = (PROC_glUniform3uiv)LoadMethod("glUniform3uiv");
	Uniform4d = (PROC_glUniform4d)LoadMethod("glUniform4d");
	Uniform4dv = (PROC_glUniform4dv)LoadMethod("glUniform4dv");
	Uniform4f = (PROC_glUniform4f)LoadMethod("glUniform4f");
	Uniform4fv = (PROC_glUniform4fv)LoadMethod("glUniform4fv");
	Uniform4i = (PROC_glUniform4i)LoadMethod("glUniform4i");
	Uniform4iv = (PROC_glUniform4iv)LoadMethod("glUniform4iv");
	Uniform4ui = (PROC_glUniform4ui)LoadMethod("glUniform4ui");
	Uniform4uiv = (PROC_glUniform4uiv)LoadMethod("glUniform4uiv");
	UniformBlockBinding = (PROC_glUniformBlockBinding)LoadMethod("glUniformBlockBinding");
	UniformMatrix2dv = (PROC_glUniformMatrix2dv)LoadMethod("glUniformMatrix2dv");
	UniformMatrix2fv = (PROC_glUniformMatrix2fv)LoadMethod("glUniformMatrix2fv");
	UniformMatrix2x3dv = (PROC_glUniformMatrix2x3dv)LoadMethod("glUniformMatrix2x3dv");
	UniformMatrix2x3fv = (PROC_glUniformMatrix2x3fv)LoadMethod("glUniformMatrix2x3fv");
	UniformMatrix2x4dv = (PROC_glUniformMatrix2x4dv)LoadMethod("glUniformMatrix2x4dv");
	UniformMatrix2x4fv = (PROC_glUniformMatrix2x4fv)LoadMethod("glUniformMatrix2x4fv");
	UniformMatrix3dv = (PROC_glUniformMatrix3dv)LoadMethod("glUniformMatrix3dv");
	UniformMatrix3fv = (PROC_glUniformMatrix3fv)LoadMethod("glUniformMatrix3fv");
	UniformMatrix3x2dv = (PROC_glUniformMatrix3x2dv)LoadMethod("glUniformMatrix3x2dv");
	UniformMatrix3x2fv = (PROC_glUniformMatrix3x2fv)LoadMethod("glUniformMatrix3x2fv");
	UniformMatrix3x4dv = (PROC_glUniformMatrix3x4dv)LoadMethod("glUniformMatrix3x4dv");
	UniformMatrix3x4fv = (PROC_glUniformMatrix3x4fv)LoadMethod("glUniformMatrix3x4fv");
	UniformMatrix4dv = (PROC_glUniformMatrix4dv)LoadMethod("glUniformMatrix4dv");
	UniformMatrix4fv = (PROC_glUniformMatrix4fv)LoadMethod("glUniformMatrix4fv");
	UniformMatrix4x2dv = (PROC_glUniformMatrix4x2dv)LoadMethod("glUniformMatrix4x2dv");
	UniformMatrix4x2fv = (PROC_glUniformMatrix4x2fv)LoadMethod("glUniformMatrix4x2fv");
	UniformMatrix4x3dv = (PROC_glUniformMatrix4x3dv)LoadMethod("glUniformMatrix4x3dv");
	UniformMatrix4x3fv = (PROC_glUniformMatrix4x3fv)LoadMethod("glUniformMatrix4x3fv");
	UniformSubroutinesuiv = (PROC_glUniformSubroutinesuiv)LoadMethod("glUniformSubroutinesuiv");
	UnmapBuffer = (PROC_glUnmapBuffer)LoadMethod("glUnmapBuffer");
	UnmapNamedBuffer = (PROC_glUnmapNamedBuffer)LoadMethod("glUnmapNamedBuffer");
	UseProgram = (PROC_glUseProgram)LoadMethod("glUseProgram");
	UseProgramStages = (PROC_glUseProgramStages)LoadMethod("glUseProgramStages");
	ValidateProgram = (PROC_glValidateProgram)LoadMethod("glValidateProgram");
	ValidateProgramPipeline = (PROC_glValidateProgramPipeline)LoadMethod("glValidateProgramPipeline");
	VertexArrayAttribBinding = (PROC_glVertexArrayAttribBinding)LoadMethod("glVertexArrayAttribBinding");
	VertexArrayAttribFormat = (PROC_glVertexArrayAttribFormat)LoadMethod("glVertexArrayAttribFormat");
	VertexArrayAttribIFormat = (PROC_glVertexArrayAttribIFormat)LoadMethod("glVertexArrayAttribIFormat");
	VertexArrayAttribLFormat = (PROC_glVertexArrayAttribLFormat)LoadMethod("glVertexArrayAttribLFormat");
	VertexArrayBindingDivisor = (PROC_glVertexArrayBindingDivisor)LoadMethod("glVertexArrayBindingDivisor");
	VertexArrayElementBuffer = (PROC_glVertexArrayElementBuffer)LoadMethod("glVertexArrayElementBuffer");
	VertexArrayVertexBuffer = (PROC_glVertexArrayVertexBuffer)LoadMethod("glVertexArrayVertexBuffer");
	VertexArrayVertexBuffers = (PROC_glVertexArrayVertexBuffers)LoadMethod("glVertexArrayVertexBuffers");
	VertexAttrib1d = (PROC_glVertexAttrib1d)LoadMethod("glVertexAttrib1d");
	VertexAttrib1dv = (PROC_glVertexAttrib1dv)LoadMethod("glVertexAttrib1dv");
	VertexAttrib1f = (PROC_glVertexAttrib1f)LoadMethod("glVertexAttrib1f");
	VertexAttrib1fv = (PROC_glVertexAttrib1fv)LoadMethod("glVertexAttrib1fv");
	VertexAttrib1s = (PROC_glVertexAttrib1s)LoadMethod("glVertexAttrib1s");
	VertexAttrib1sv = (PROC_glVertexAttrib1sv)LoadMethod("glVertexAttrib1sv");
	VertexAttrib2d = (PROC_glVertexAttrib2d)LoadMethod("glVertexAttrib2d");
	VertexAttrib2dv = (PROC_glVertexAttrib2dv)LoadMethod("glVertexAttrib2dv");
	VertexAttrib2f = (PROC_glVertexAttrib2f)LoadMethod("glVertexAttrib2f");
	VertexAttrib2fv = (PROC_glVertexAttrib2fv)LoadMethod("glVertexAttrib2fv");
	VertexAttrib2s = (PROC_glVertexAttrib2s)LoadMethod("glVertexAttrib2s");
	VertexAttrib2sv = (PROC_glVertexAttrib2sv)LoadMethod("glVertexAttrib2sv");
	VertexAttrib3d = (PROC_glVertexAttrib3d)LoadMethod("glVertexAttrib3d");
	VertexAttrib3dv = (PROC_glVertexAttrib3dv)LoadMethod("glVertexAttrib3dv");
	VertexAttrib3f = (PROC_glVertexAttrib3f)LoadMethod("glVertexAttrib3f");
	VertexAttrib3fv = (PROC_glVertexAttrib3fv)LoadMethod("glVertexAttrib3fv");
	VertexAttrib3s = (PROC_glVertexAttrib3s)LoadMethod("glVertexAttrib3s");
	VertexAttrib3sv = (PROC_glVertexAttrib3sv)LoadMethod("glVertexAttrib3sv");
	VertexAttrib4Nbv = (PROC_glVertexAttrib4Nbv)LoadMethod("glVertexAttrib4Nbv");
	VertexAttrib4Niv = (PROC_glVertexAttrib4Niv)LoadMethod("glVertexAttrib4Niv");
	VertexAttrib4Nsv = (PROC_glVertexAttrib4Nsv)LoadMethod("glVertexAttrib4Nsv");
	VertexAttrib4Nub = (PROC_glVertexAttrib4Nub)LoadMethod("glVertexAttrib4Nub");
	VertexAttrib4Nubv = (PROC_glVertexAttrib4Nubv)LoadMethod("glVertexAttrib4Nubv");
	VertexAttrib4Nuiv = (PROC_glVertexAttrib4Nuiv)LoadMethod("glVertexAttrib4Nuiv");
	VertexAttrib4Nusv = (PROC_glVertexAttrib4Nusv)LoadMethod("glVertexAttrib4Nusv");
	VertexAttrib4bv = (PROC_glVertexAttrib4bv)LoadMethod("glVertexAttrib4bv");
	VertexAttrib4d = (PROC_glVertexAttrib4d)LoadMethod("glVertexAttrib4d");
	VertexAttrib4dv = (PROC_glVertexAttrib4dv)LoadMethod("glVertexAttrib4dv");
	VertexAttrib4f = (PROC_glVertexAttrib4f)LoadMethod("glVertexAttrib4f");
	VertexAttrib4fv = (PROC_glVertexAttrib4fv)LoadMethod("glVertexAttrib4fv");
	VertexAttrib4iv = (PROC_glVertexAttrib4iv)LoadMethod("glVertexAttrib4iv");
	VertexAttrib4s = (PROC_glVertexAttrib4s)LoadMethod("glVertexAttrib4s");
	VertexAttrib4sv = (PROC_glVertexAttrib4sv)LoadMethod("glVertexAttrib4sv");
	VertexAttrib4ubv = (PROC_glVertexAttrib4ubv)LoadMethod("glVertexAttrib4ubv");
	VertexAttrib4uiv = (PROC_glVertexAttrib4uiv)LoadMethod("glVertexAttrib4uiv");
	VertexAttrib4usv = (PROC_glVertexAttrib4usv)LoadMethod("glVertexAttrib4usv");
	VertexAttribBinding = (PROC_glVertexAttribBinding)LoadMethod("glVertexAttribBinding");
	VertexAttribDivisor = (PROC_glVertexAttribDivisor)LoadMethod("glVertexAttribDivisor");
	VertexAttribFormat = (PROC_glVertexAttribFormat)LoadMethod("glVertexAttribFormat");
	VertexAttribI1i = (PROC_glVertexAttribI1i)LoadMethod("glVertexAttribI1i");
	VertexAttribI1iv = (PROC_glVertexAttribI1iv)LoadMethod("glVertexAttribI1iv");
	VertexAttribI1ui = (PROC_glVertexAttribI1ui)LoadMethod("glVertexAttribI1ui");
	VertexAttribI1uiv = (PROC_glVertexAttribI1uiv)LoadMethod("glVertexAttribI1uiv");
	VertexAttribI2i = (PROC_glVertexAttribI2i)LoadMethod("glVertexAttribI2i");
	VertexAttribI2iv = (PROC_glVertexAttribI2iv)LoadMethod("glVertexAttribI2iv");
	VertexAttribI2ui = (PROC_glVertexAttribI2ui)LoadMethod("glVertexAttribI2ui");
	VertexAttribI2uiv = (PROC_glVertexAttribI2uiv)LoadMethod("glVertexAttribI2uiv");
	VertexAttribI3i = (PROC_glVertexAttribI3i)LoadMethod("glVertexAttribI3i");
	VertexAttribI3iv = (PROC_glVertexAttribI3iv)LoadMethod("glVertexAttribI3iv");
	VertexAttribI3ui = (PROC_glVertexAttribI3ui)LoadMethod("glVertexAttribI3ui");
	VertexAttribI3uiv = (PROC_glVertexAttribI3uiv)LoadMethod("glVertexAttribI3uiv");
	VertexAttribI4bv = (PROC_glVertexAttribI4bv)LoadMethod("glVertexAttribI4bv");
	VertexAttribI4i = (PROC_glVertexAttribI4i)LoadMethod("glVertexAttribI4i");
	VertexAttribI4iv = (PROC_glVertexAttribI4iv)LoadMethod("glVertexAttribI4iv");
	VertexAttribI4sv = (PROC_glVertexAttribI4sv)LoadMethod("glVertexAttribI4sv");
	VertexAttribI4ubv = (PROC_glVertexAttribI4ubv)LoadMethod("glVertexAttribI4ubv");
	VertexAttribI4ui = (PROC_glVertexAttribI4ui)LoadMethod("glVertexAttribI4ui");
	VertexAttribI4uiv = (PROC_glVertexAttribI4uiv)LoadMethod("glVertexAttribI4uiv");
	VertexAttribI4usv = (PROC_glVertexAttribI4usv)LoadMethod("glVertexAttribI4usv");
	VertexAttribIFormat = (PROC_glVertexAttribIFormat)LoadMethod("glVertexAttribIFormat");
	VertexAttribIPointer = (PROC_glVertexAttribIPointer)LoadMethod("glVertexAttribIPointer");
	VertexAttribL1d = (PROC_glVertexAttribL1d)LoadMethod("glVertexAttribL1d");
	VertexAttribL1dv = (PROC_glVertexAttribL1dv)LoadMethod("glVertexAttribL1dv");
	VertexAttribL2d = (PROC_glVertexAttribL2d)LoadMethod("glVertexAttribL2d");
	VertexAttribL2dv = (PROC_glVertexAttribL2dv)LoadMethod("glVertexAttribL2dv");
	VertexAttribL3d = (PROC_glVertexAttribL3d)LoadMethod("glVertexAttribL3d");
	VertexAttribL3dv = (PROC_glVertexAttribL3dv)LoadMethod("glVertexAttribL3dv");
	VertexAttribL4d = (PROC_glVertexAttribL4d)LoadMethod("glVertexAttribL4d");
	VertexAttribL4dv = (PROC_glVertexAttribL4dv)LoadMethod("glVertexAttribL4dv");
	VertexAttribLFormat = (PROC_glVertexAttribLFormat)LoadMethod("glVertexAttribLFormat");
	VertexAttribLPointer = (PROC_glVertexAttribLPointer)LoadMethod("glVertexAttribLPointer");
	VertexAttribP1ui = (PROC_glVertexAttribP1ui)LoadMethod("glVertexAttribP1ui");
	VertexAttribP1uiv = (PROC_glVertexAttribP1uiv)LoadMethod("glVertexAttribP1uiv");
	VertexAttribP2ui = (PROC_glVertexAttribP2ui)LoadMethod("glVertexAttribP2ui");
	VertexAttribP2uiv = (PROC_glVertexAttribP2uiv)LoadMethod("glVertexAttribP2uiv");
	VertexAttribP3ui = (PROC_glVertexAttribP3ui)LoadMethod("glVertexAttribP3ui");
	VertexAttribP3uiv = (PROC_glVertexAttribP3uiv)LoadMethod("glVertexAttribP3uiv");
	VertexAttribP4ui = (PROC_glVertexAttribP4ui)LoadMethod("glVertexAttribP4ui");
	VertexAttribP4uiv = (PROC_glVertexAttribP4uiv)LoadMethod("glVertexAttribP4uiv");
	VertexAttribPointer = (PROC_glVertexAttribPointer)LoadMethod("glVertexAttribPointer");
	VertexBindingDivisor = (PROC_glVertexBindingDivisor)LoadMethod("glVertexBindingDivisor");
	Viewport = (PROC_glViewport)LoadMethod("glViewport");
	ViewportArrayv = (PROC_glViewportArrayv)LoadMethod("glViewportArrayv");
	ViewportIndexedf = (PROC_glViewportIndexedf)LoadMethod("glViewportIndexedf");
	ViewportIndexedfv = (PROC_glViewportIndexedfv)LoadMethod("glViewportIndexedfv");

	// TODO: better

	if (INVALID_METHOD(GetProgramStageiv)) {
		GetProgramStageiv = FakeGetProgramStageiv;
	}

	// printf("%s\n", GetString(GL_VENDOR));
	// printf("%s\n", GetString(GL_VERSION));

	/*

	If glGetString(GL_VENDOR) returns something other than "Microsoft
	Corporation", it means you're using the board's ICD. If it returns
	"Microsoft Corporation", this implies you chose a pixel format that your
	device can't accelerate. However, glGetString(GL_VENDOR) also returns this
	if your device has an MCD instead of an ICD, which means you might still
	be hardware accelerated in this case.

	*/
}
